package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.container.RuntimeContainerDelegate;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.application.SpringProcessApplication;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.camunda.bpm.spring.boot.starter.util.GetProcessApplicationNameFromAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

import static org.camunda.bpm.application.ProcessApplicationInfo.PROP_SERVLET_CONTEXT_PATH;
import static org.camunda.bpm.spring.boot.starter.util.GetProcessApplicationNameFromAnnotation.processApplicationNameFromAnnotation;
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

  @Value("${server.contextPath:/}")
  protected String contextPath;

  @Autowired
  protected ProcessEngine processEngine;

  protected GetProcessApplicationNameFromAnnotation nameFromAnnotation;

  @Override
  public void afterPropertiesSet() throws Exception {
    processApplicationNameFromAnnotation(applicationContext)
      .apply(springApplicationName)
      .ifPresent(this::setBeanName);

    RuntimeContainerDelegate.INSTANCE.get().registerProcessEngine(processEngine);

    properties.put(PROP_SERVLET_CONTEXT_PATH, contextPath);
    super.afterPropertiesSet();
  }

  @Override
  public void destroy() throws Exception {
    super.destroy();
    RuntimeContainerDelegate.INSTANCE.get().unregisterProcessEngine(processEngine);
  }
}
