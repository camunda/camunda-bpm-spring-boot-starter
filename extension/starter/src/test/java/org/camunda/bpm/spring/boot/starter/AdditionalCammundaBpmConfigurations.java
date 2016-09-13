package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.spring.boot.starter.configuration.Ordering;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;

@TestConfiguration
public class AdditionalCammundaBpmConfigurations {

  @Bean
  public ProcessEnginePlugin beforeStandardConfiguration() {
    return new BeforeStandardConfiguration();
  }

  @Bean
  public ProcessEnginePlugin afterStandardConfiguration() {
    return new AfterStandardConfiguration();
  }

  @Order(Ordering.DEFAULT_ORDER - 1)
  public static class BeforeStandardConfiguration implements ProcessEnginePlugin {

    static boolean PROCESSED = false;

    @Override
    public void preInit(ProcessEngineConfigurationImpl configuration) {
      assertNull(configuration.getDataSource());
      PROCESSED = true;
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin#postInit(org.camunda.
     * bpm.engine.impl.cfg.ProcessEngineConfigurationImpl)
     */
    @Override
    public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
      // TODO Auto-generated method stub

    }

    /*
     * (non-Javadoc)
     * 
     * @see org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin#
     * postProcessEngineBuild(org.camunda.bpm.engine.ProcessEngine)
     */
    @Override
    public void postProcessEngineBuild(ProcessEngine processEngine) {
      // TODO Auto-generated method stub

    }

  }

  @Order(Ordering.DEFAULT_ORDER + 1)
  public static class AfterStandardConfiguration implements ProcessEnginePlugin {

    static boolean PROCESSED = false;

    @Override
    public void preInit(ProcessEngineConfigurationImpl configuration) {
      assertNotNull(configuration.getDataSource());
      PROCESSED = true;
    }

    /*
     * (non-Javadoc)
     * 
     * @see
     * org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin#postInit(org.camunda.
     * bpm.engine.impl.cfg.ProcessEngineConfigurationImpl)
     */
    @Override
    public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
      // TODO Auto-generated method stub

    }

    /*
     * (non-Javadoc)
     * 
     * @see org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin#
     * postProcessEngineBuild(org.camunda.bpm.engine.ProcessEngine)
     */
    @Override
    public void postProcessEngineBuild(ProcessEngine processEngine) {
      // TODO Auto-generated method stub

    }

  }
}
