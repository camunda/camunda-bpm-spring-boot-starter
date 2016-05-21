package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.engine.impl.jobexecutor.JobHandler;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class DefaultProcessEngineConfiguration extends AbstractCamundaConfiguration implements CamundaProcessEngineConfiguration {

  @Autowired(required = false)
  private List<ProcessEnginePlugin> processEnginePlugins;


  @Override
  public void accept(SpringProcessEngineConfiguration configuration) {
    String processEngineName = camundaBpmProperties.getProcessEngineName();
    if (!StringUtils.isEmpty(processEngineName)) {
      configuration.setProcessEngineName(processEngineName);
    }

    if (!CollectionUtils.isEmpty(processEnginePlugins)) {
      configuration.setProcessEnginePlugins(processEnginePlugins);
    }

  }

}
