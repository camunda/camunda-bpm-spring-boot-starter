package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;

import lombok.Data;

@Data
public class SpringProcessEngineConfigurationTemplate {

  private final SpringProcessEngineConfiguration template;
}
