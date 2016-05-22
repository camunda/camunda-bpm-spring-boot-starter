package org.camunda.bpm.spring.boot.starter.configuration.impl;

import javax.annotation.PostConstruct;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaMetricsConfiguration;

public class DefaultMetricsConfiguration extends AbstractCamundaConfiguration implements CamundaMetricsConfiguration {

  private CamundaBpmProperties.Metrics metrics;

  @PostConstruct
  void init() {
    metrics = camundaBpmProperties.getMetrics();
  }

  @Override
  public void preInit(final SpringProcessEngineConfiguration configuration) {
    configuration.setMetricsEnabled(metrics.isEnabled());
    if (metrics.getMetricsRegistry() != null) {
      configuration.setMetricsRegistry(metrics.getMetricsRegistry());
    }
    if (metrics.getMetricsReporterIdProvider() != null) {
      configuration.setMetricsReporterIdProvider(metrics.getMetricsReporterIdProvider());
    }

    configuration.setDbMetricsReporterActivate(metrics.isDbMetricsReporterActivate());
    if (metrics.getDbMetricsReporter() != null) {
      configuration.setDbMetricsReporter(metrics.getDbMetricsReporter());
    }
  }
}
