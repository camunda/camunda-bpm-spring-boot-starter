package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties.GenericProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.Ordering;
import org.camunda.bpm.spring.boot.starter.util.PropertiesToConfigurationBinder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.annotation.Order;

@Order(Ordering.DEFAULT_ORDER - 1)
public class GenericPropertiesConfiguration extends AbstractCamundaConfiguration {

  @Override
  public void preInit(SpringProcessEngineConfiguration springProcessEngineConfiguration) {
    GenericProcessEngineConfiguration genericProcessEngineConfiguration = camundaBpmProperties.getProcessEngineConfiguration();
    PropertiesToConfigurationBinder.bind(springProcessEngineConfiguration, genericProcessEngineConfiguration.getPropertiesFiltered(),
        genericProcessEngineConfiguration.isIgnoreInvalidFields(), genericProcessEngineConfiguration.isIgnoreUnknownFields());
    logger.debug("properties bound to configuration: {}", genericProcessEngineConfiguration);
  }

  @ConfigurationProperties(prefix = GenericProcessEngineConfiguration.PREFIX)
  private static class CodeCompletionForPropertiesHelper extends SpringProcessEngineConfiguration {

  }
}
