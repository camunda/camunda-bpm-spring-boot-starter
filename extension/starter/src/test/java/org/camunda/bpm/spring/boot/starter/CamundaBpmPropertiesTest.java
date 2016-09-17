package org.camunda.bpm.spring.boot.starter;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties.GenericProcessEngineConfiguration;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

public class CamundaBpmPropertiesTest {

  @Rule
  public final ExpectedException thrown = ExpectedException.none();

  @Test
  public void initResourcePatterns() {
    final String[] patterns = CamundaBpmProperties.initDeploymentResourcePattern();

    assertThat(patterns).hasSize(7);
    assertThat(patterns).containsOnly("classpath*:**/*.bpmn", "classpath*:**/*.bpmn20.xml", "classpath*:**/*.dmn", "classpath*:**/*.dmn11.xml",
        "classpath*:**/*.cmmn", "classpath*:**/*.cmmn10.xml", "classpath*:**/*.cmmn11.xml");
  }

  @Test
  public void application_defaults() throws Exception {
    assertThat(new CamundaBpmProperties().getApplication().isDeleteUponUndeploy()).isFalse();
  }

  @Test
  public void restrict_allowed_values_for_dbUpdate() {
    assertThat(validateDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE)).isEmpty();
    assertThat(validateDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_FALSE)).isEmpty();
    assertThat(validateDatabaseSchemaUpdate(ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE)).isEmpty();
    assertThat(validateDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_CREATE_DROP)).isEmpty();
    assertThat(validateDatabaseSchemaUpdate(ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_DROP_CREATE)).isEmpty();
    assertThat(validateDatabaseSchemaUpdate("foo")).isNotEmpty();
  }

  private Set<ConstraintViolation<GenericProcessEngineConfiguration>> validateDatabaseSchemaUpdate(String value) {
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    GenericProcessEngineConfiguration configuration = new GenericProcessEngineConfiguration();
    configuration.getProperties().put("database-schema-update", value);

    return validator.validate(configuration);
  }
}
