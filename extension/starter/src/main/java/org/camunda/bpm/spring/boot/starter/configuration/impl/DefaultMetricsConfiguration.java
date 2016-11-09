package org.camunda.bpm.spring.boot.starter.configuration.impl;

import javax.annotation.PostConstruct;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaMetricsConfiguration;
import org.camunda.bpm.spring.boot.starter.property.Metrics;

public class DefaultMetricsConfiguration extends AbstractCamundaConfiguration implements CamundaMetricsConfiguration {

  private Metrics metrics;

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
