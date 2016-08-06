package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaMetricsConfiguration;

import javax.annotation.PostConstruct;

public class DefaultMetricsConfiguration extends AbstractCamundaConfiguration implements CamundaMetricsConfiguration {

  private CamundaBpmProperties.Metrics metrics;

  @PostConstruct
  void init() {
    metrics = camundaBpmProperties.getMetrics();
  }

  @Override
  public void preInit(final SpringProcessEngineConfiguration configuration) {
    configuration.setMetricsEnabled(metrics.isEnabled());
    configuration.setDbMetricsReporterActivate(metrics.isDbReporterActivate());
  }
}
