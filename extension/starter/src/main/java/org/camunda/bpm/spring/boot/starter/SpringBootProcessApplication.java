package org.camunda.bpm.spring.boot.starter;

import static org.slf4j.LoggerFactory.getLogger;

import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.application.ProcessApplicationInfo;
import org.camunda.bpm.container.RuntimeContainerDelegate;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.application.SpringProcessApplication;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.camunda.bpm.spring.boot.starter.util.SpringProcessEnginePlugin;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

@Slf4j
public class SpringBootProcessApplication extends SpringProcessApplication {

  @Autowired
  private ProcessEngine processEngine;

  @Bean
  public static CamundaDeploymentConfiguration deploymentConfiguration() {
    return new CamundaDeploymentConfiguration() {
      @Override
      public void preInit(ProcessEngineConfigurationImpl configuration) {
        log.info("Using ProcessApplication: autoDeployment via springConfiguration is disabled");
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
