package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;

@Data
public class Metrics {

  private boolean enabled = Defaults.INSTANCE.isMetricsEnabled();
  private boolean dbReporterActivate = Defaults.INSTANCE.isDbMetricsReporterActivate();
}
