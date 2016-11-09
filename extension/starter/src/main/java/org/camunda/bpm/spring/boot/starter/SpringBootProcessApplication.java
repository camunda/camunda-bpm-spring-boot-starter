package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.application.ProcessApplicationInfo;
import org.camunda.bpm.container.RuntimeContainerDelegate;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.application.SpringProcessApplication;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.camunda.bpm.spring.boot.starter.util.GetProcessApplicationNameFromAnnotation;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

import static org.camunda.bpm.spring.boot.starter.util.SpringBootProcessEngineLogger.LOG;

public class SpringBootProcessApplication extends SpringProcessApplication {

  @Bean
  public static CamundaDeploymentConfiguration deploymentConfiguration() {
    return new CamundaDeploymentConfiguration() {
      @Override
      public void preInit(ProcessEngineConfigurationImpl configuration) {
        LOG.skipAutoDeployment();
      }
    };
  }

  @Value("${spring.application.name:null}")
  protected Optional<String> springApplicationName;

  @Autowired
  protected ProcessEngine processEngine;

  protected GetProcessApplicationNameFromAnnotation nameFromAnnotation;

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    nameFromAnnotation = new GetProcessApplicationNameFromAnnotation(applicationContext);
    super.setApplicationContext(applicationContext);
  }

  @Override
  public void afterPropertiesSet() throws Exception {
    nameFromAnnotation.apply(springApplicationName).ifPresent(this::setBeanName);

    RuntimeContainerDelegate.INSTANCE.get().registerProcessEngine(processEngine);

    properties.put(ProcessApplicationInfo.PROP_SERVLET_CONTEXT_PATH, "/");
    super.afterPropertiesSet();
  }

}
