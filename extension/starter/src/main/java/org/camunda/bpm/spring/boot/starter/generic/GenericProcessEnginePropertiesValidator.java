package org.camunda.bpm.spring.boot.starter.generic;

import java.util.Arrays;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.util.PropertiesToConfigurationBinder;

public final class GenericProcessEnginePropertiesValidator implements ConstraintValidator<ValidGenericProcessEngineProperties, GenericProcessEngineProperties> {

  public static final List<String> SCHEMA_UPDATE_VALUES = Arrays.asList(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE,
      ProcessEngineConfiguration.DB_SCHEMA_UPDATE_FALSE, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE,
      ProcessEngineConfiguration.DB_SCHEMA_UPDATE_CREATE_DROP, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_DROP_CREATE);

  @Override
  public void initialize(ValidGenericProcessEngineProperties constraintAnnotation) {
  }

  @Override
  public boolean isValid(GenericProcessEngineProperties genericProcessEngineProperties, ConstraintValidatorContext context) {
    SpringProcessEngineConfiguration springProcessEngineConfiguration = PropertiesToConfigurationBinder.bind(genericProcessEngineProperties);
    boolean isValid = true;
    isValid = isValid && validateSchemaUpdate(context, springProcessEngineConfiguration);
    return isValid;
  }

  private boolean validateSchemaUpdate(ConstraintValidatorContext context, SpringProcessEngineConfiguration springProcessEngineConfiguration) {
    final String schemaUpdate = springProcessEngineConfiguration.getDatabaseSchemaUpdate();
    boolean isValid = SCHEMA_UPDATE_VALUES.contains(schemaUpdate);
    if (!isValid) {
      context.disableDefaultConstraintViolation();
      context.buildConstraintViolationWithTemplate(String.format("schemaUpdate: '%s' is not valid (%s)", schemaUpdate, SCHEMA_UPDATE_VALUES))
          .addPropertyNode("schemaUpdate").addConstraintViolation();
    }
    return isValid;
  }

}