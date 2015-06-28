package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import javax.transaction.Transactional;

import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaAutoConfigurationIT.AdditionalCammundaBpmConfigurations;
import org.camunda.bpm.spring.boot.starter.CamundaAutoConfigurationIT.AdditionalCammundaBpmConfigurations.AfterStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaAutoConfigurationIT.AdditionalCammundaBpmConfigurations.BeforeStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.camunda.bpm.spring.boot.starter.test.TestApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { TestApplication.class, AdditionalCammundaBpmConfigurations.class })
@Transactional
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

  @Configuration
  public static class AdditionalCammundaBpmConfigurations {

    @Bean
    public CamundaConfiguration beforeStandardConfiguration() {
      return new BeforeStandardConfiguration();
    }

    @Bean
    public CamundaConfiguration afterStandardConfiguration() {
      return new AfterStandardConfiguration();
    }

    @Order(CamundaConfiguration.DEFAULT_ORDER - 1)
    public static class BeforeStandardConfiguration implements CamundaConfiguration {

      static boolean PROCESSED = false;

      @Override
      public void apply(SpringProcessEngineConfiguration configuration) {
        assertNull(configuration.getDataSource());
        PROCESSED = true;
      }

    }

    @Order(CamundaConfiguration.DEFAULT_ORDER + 1)
    public static class AfterStandardConfiguration implements CamundaConfiguration {

      static boolean PROCESSED = false;

      @Override
      public void apply(SpringProcessEngineConfiguration configuration) {
        assertNotNull(configuration.getDataSource());
        PROCESSED = true;
      }

    }
  }
}
