package org.camunda.bpm.spring.boot.starter;

import static org.slf4j.LoggerFactory.getLogger;

import org.camunda.bpm.application.ProcessApplicationInfo;
import org.camunda.bpm.container.RuntimeContainerDelegate;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.application.SpringProcessApplication;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

public class SpringBootProcessApplication extends SpringProcessApplication {

  private static final Logger LOGGER = getLogger(SpringBootProcessApplication.class);

  @Autowired
  private CamundaBpmProperties camundaBpmProperties;

  @Autowired
  private ProcessEngine processEngine;

  @Bean
  public static CamundaDeploymentConfiguration deploymentConfiguration() {
    return new CamundaDeploymentConfiguration() {
      @Override
      public void preInit(ProcessEngineConfigurationImpl configuration) {
        LOGGER.info("Using ProcessApplication: autoDeployment via springConfiguration is disabled");
      }

      @Override
      public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
      }

      @Override
      public void postProcessEngineBuild(ProcessEngine processEngine) {
      }
    };
  }

  @Override
  public void afterPropertiesSet() throws Exception {
    RuntimeContainerDelegate.INSTANCE.get().registerProcessEngine(processEngine);

    properties.put(ProcessApplicationInfo.PROP_SERVLET_CONTEXT_PATH, "/");
    super.afterPropertiesSet();
  }

}
