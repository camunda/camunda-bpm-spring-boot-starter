package org.camunda.bpm.spring.boot.starter.configuration.impl;

import java.util.Map;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.Ordering;
import org.camunda.bpm.spring.boot.starter.generic.GenericProcessEngineProperties;
import org.camunda.bpm.spring.boot.starter.util.PropertiesToConfigurationBinder;
import org.springframework.core.annotation.Order;

@Order(Ordering.DEFAULT_ORDER - 1)
public class GenericPropertiesConfiguration extends AbstractCamundaConfiguration {

  @Override
  public void preInit(SpringProcessEngineConfiguration springProcessEngineConfiguration) {
    GenericProcessEngineProperties genericProcessEngineConfiguration = camundaBpmProperties.getProcessEngineConfiguration();

    final Map<String, Object> properties = (genericProcessEngineConfiguration.isFilterProperties()) ? genericProcessEngineConfiguration.getPropertiesFiltered()
        : genericProcessEngineConfiguration.getProperties();
    PropertiesToConfigurationBinder.bind(springProcessEngineConfiguration, properties, genericProcessEngineConfiguration.isIgnoreInvalidFields(),
        genericProcessEngineConfiguration.isIgnoreUnknownFields());
    logger.debug("properties bound to configuration: {}", genericProcessEngineConfiguration);
  }

}
