package org.camunda.bpm.spring.boot.starter.configuration;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;

public interface CamundaConfiguration {

  static final int DEFAULT_ORDER = 0;

  void alter(SpringProcessEngineConfiguration configuration);

}
