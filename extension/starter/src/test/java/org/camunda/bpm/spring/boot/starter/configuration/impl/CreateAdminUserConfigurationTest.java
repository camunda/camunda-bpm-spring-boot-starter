package org.camunda.bpm.spring.boot.starter.configuration.impl;


import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.engine.test.mock.MockExpressionManager;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

public class CreateAdminUserConfigurationTest {

  private final CamundaBpmProperties camundaBpmProperties = new CamundaBpmProperties();
  {
    camundaBpmProperties.getAdminUser().setId("admin");
    camundaBpmProperties.getAdminUser().setPassword("password");
  }

  private final CreateAdminUserConfiguration createAdminUserConfiguration = new CreateAdminUserConfiguration();
  {
    ReflectionTestUtils.setField(createAdminUserConfiguration, "camundaBpmProperties", camundaBpmProperties);
    createAdminUserConfiguration.init();
  }

  private final ProcessEngineConfigurationImpl processEngineConfiguration = new StandaloneInMemProcessEngineConfiguration() {
    {
      jobExecutorActivate = false;
      expressionManager = new MockExpressionManager();
      databaseSchemaUpdate = DB_SCHEMA_UPDATE_DROP_CREATE;
      isDbMetricsReporterActivate = false;
      getProcessEnginePlugins().add(createAdminUserConfiguration);
    }
  };

  @Rule
  public final ProcessEngineRule processEngineRule = new ProcessEngineRule(processEngineConfiguration.buildProcessEngine());

  @Test
  public void createAdminUser() throws Exception {
    User user = processEngineRule.getIdentityService().createUserQuery().userId("admin").singleResult();
    assertThat(user).isNotNull();
    assertThat(user.getEmail()).isEqualTo("admin@localhost");
  }
}
