package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.application.ProcessApplicationInfo;
import org.camunda.bpm.container.RuntimeContainerDelegate;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.application.SpringProcessApplication;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.camunda.bpm.spring.boot.starter.container.SpringBootProcessEngineLogger;
import org.camunda.bpm.spring.boot.starter.container.SpringBootRuntimeContainerDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

public class SpringBootProcessApplication extends SpringProcessApplication {

  @Autowired
  protected ProcessEngine processEngine;

  @Autowired
  protected SpringBootRuntimeContainerDelegate runtimeContainerDelegate;

  @Bean
  public static CamundaDeploymentConfiguration deploymentConfiguration() {
    return new CamundaDeploymentConfiguration() {
      @Override
      public void preInit(ProcessEngineConfigurationImpl configuration) {
        SpringBootProcessEngineLogger.INSTANCE.disableAutoDeployment();
      }
    };
  }

  @Override
  public void afterPropertiesSet() throws Exception {
    runtimeContainerDelegate.registerProcessEngine(processEngine);
    RuntimeContainerDelegate.INSTANCE.set(runtimeContainerDelegate);

    properties.put(ProcessApplicationInfo.PROP_SERVLET_CONTEXT_PATH, "/");
    super.afterPropertiesSet();
  }

}
