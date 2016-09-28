package org.camunda.bpm.spring.boot.starter.util;

import java.util.Map;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.generic.GenericProcessEngineProperties;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.PropertyValues;
import org.springframework.boot.bind.RelaxedDataBinder;

public final class PropertiesToConfigurationBinder {

  private PropertiesToConfigurationBinder() {
  }

  public static SpringProcessEngineConfiguration bind(final GenericProcessEngineProperties genericProcessEngineConfiguration) {
    final SpringProcessEngineConfiguration springProcessEngineConfiguration = new SpringProcessEngineConfiguration();
    bind(springProcessEngineConfiguration, genericProcessEngineConfiguration);
    return springProcessEngineConfiguration;
  }

  public static void bind(final SpringProcessEngineConfiguration springProcessEngineConfiguration,
      final GenericProcessEngineProperties genericProcessEngineConfiguration) {
    bind(springProcessEngineConfiguration, genericProcessEngineConfiguration.getProperties(), genericProcessEngineConfiguration.isIgnoreInvalidFields(),
        genericProcessEngineConfiguration.isIgnoreUnknownFields());
  }

  public static void bind(final SpringProcessEngineConfiguration springProcessEngineConfiguration, final Map<String, Object> properties,
      final boolean ignoreInvalidFields, boolean ignoreUnknownFields) {
    RelaxedDataBinder relaxedDataBinder = new RelaxedDataBinder(springProcessEngineConfiguration);
    relaxedDataBinder.setIgnoreInvalidFields(ignoreInvalidFields);
    relaxedDataBinder.setIgnoreUnknownFields(ignoreUnknownFields);
    relaxedDataBinder.bind(getPropertyValues(properties));
  }

  private static PropertyValues getPropertyValues(Map<String, Object> genericProperties) {
    return new MutablePropertyValues(genericProperties);
  }
}
