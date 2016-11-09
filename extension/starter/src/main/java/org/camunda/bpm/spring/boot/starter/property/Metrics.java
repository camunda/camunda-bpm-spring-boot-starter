package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;

@Data
public class Metrics {

  private boolean enabled = true;
  private boolean dbReporterActivate = true;
}
