package org.camunda.bpm.spring.boot.starter.configuration.impl;

import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

public class DefaultProcessEngineConfiguration extends AbstractCamundaConfiguration implements CamundaProcessEngineConfiguration {

  @Autowired(required = false)
  private List<ProcessEnginePlugin> processEnginePlugins;

  @Override
  public void preInit(SpringProcessEngineConfiguration configuration) {
    String processEngineName = StringUtils.trimAllWhitespace(camundaBpmProperties.getProcessEngineName());
    if (!StringUtils.isEmpty(processEngineName) && !processEngineName.contains("-")) {
      configuration.setProcessEngineName(processEngineName);
    } else {
      logger.warn("Ignoring invalid processEngineName='{}' - must not be null, blank or contain hyphen", camundaBpmProperties.getProcessEngineName());
    }

    if (!CollectionUtils.isEmpty(processEnginePlugins)) {
      configuration.getProcessEnginePlugins().addAll(processEnginePlugins);
    }
  }

}
