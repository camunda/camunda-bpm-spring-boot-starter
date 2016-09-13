package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.spring.boot.starter.AdditionalCammundaBpmConfigurations.AfterStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.AdditionalCammundaBpmConfigurations.BeforeStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.test.TestApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TestApplication.class, AdditionalCammundaBpmConfigurations.class }, webEnvironment = WebEnvironment.NONE)
public class CamundaAutoConfigurationIT extends AbstractCamundaAutoConfigurationIT {

  @Test
  public void autoDeploymentTest() {
    ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionName("TestProcess").singleResult();
    assertNotNull(processDefinition);
  }

  @Test
  public void jobConfigurationTest() {
    assertTrue(jobExecutor.isActive());
  }

  @Test
  public void orderedConfigurationTest() {
    assertTrue(BeforeStandardConfiguration.PROCESSED);
    assertTrue(AfterStandardConfiguration.PROCESSED);
  }
}
