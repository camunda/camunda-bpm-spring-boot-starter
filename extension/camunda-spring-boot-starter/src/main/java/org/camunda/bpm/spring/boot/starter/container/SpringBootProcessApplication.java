package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.application.ProcessApplicationInfo;
import org.camunda.bpm.engine.spring.application.SpringProcessApplication;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.Map;

@ProcessApplication
public class SpringBootProcessApplication extends SpringProcessApplication {

  @Autowired
  private CamundaBpmProperties camundaBpmProperties;

  @Override
  public void afterPropertiesSet() throws Exception {
    properties.put(ProcessApplicationInfo.PROP_SERVLET_CONTEXT_PATH, "/");
    super.afterPropertiesSet();
  }

}
