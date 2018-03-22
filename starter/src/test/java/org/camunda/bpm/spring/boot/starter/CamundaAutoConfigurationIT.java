package org.camunda.bpm.spring.boot.starter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.annotation.DirtiesContext.ClassMode.BEFORE_CLASS;

import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.spring.boot.starter.AdditionalCammundaBpmConfigurations.AfterStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.AdditionalCammundaBpmConfigurations.BeforeStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.test.nonpa.TestApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(
  classes = { TestApplication.class, AdditionalCammundaBpmConfigurations.class },
  webEnvironment = WebEnvironment.NONE,
  properties = { "camunda.bpm.admin-user.id=admin"}
)
@DirtiesContext(classMode = BEFORE_CLASS)
public class CamundaAutoConfigurationIT extends AbstractCamundaAutoConfigurationIT {

  @Test
  public void autoDeploymentTest() {
    ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionName("TestProcess").latestVersion().singleResult();
    assertThat(processDefinition).isNotNull();
  }

  @Test
  public void jobConfigurationTest() {
    assertThat(jobExecutor.isActive()).isTrue();
  }

  @Test
  public void orderedConfigurationTest() {
    assertThat(BeforeStandardConfiguration.PROCESSED).isTrue();
    assertThat(AfterStandardConfiguration.PROCESSED).isTrue();
  }

  @Test
  public void adminUserCreatedWithDefaultPassword() throws Exception {
    assertThat(identityService.checkPassword("admin", "admin")).isTrue();
  }
}
