package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;

import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.DEFAULTS;

@Data
public class Metrics {

  private boolean enabled = DEFAULTS.isMetricsEnabled();
  private boolean dbReporterActivate = DEFAULTS.isDbMetricsReporterActivate();
}
