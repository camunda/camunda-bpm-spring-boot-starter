package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration;
import org.springframework.util.StringUtils;

public class DefaultProcessEngineConfiguration extends AbstractCamundaConfiguration implements CamundaProcessEngineConfiguration {

  @Override
  public void preInit(SpringProcessEngineConfiguration configuration) {
    SpringProcessEngineConfiguration configurationTemplate = getConfigurationTemplate();

    String processEngineName = StringUtils.trimAllWhitespace(configurationTemplate.getProcessEngineName());
    if (!StringUtils.isEmpty(processEngineName) && !processEngineName.contains("-")) {
      configuration.setProcessEngineName(processEngineName);
    } else {
      logger.warn("Ignoring invalid processEngineName='{}' - must not be null, blank or contain hyphen", configurationTemplate.getProcessEngineName());
    }

    String defaultSerializationFormat = configurationTemplate.getDefaultSerializationFormat();
    if (StringUtils.hasText(defaultSerializationFormat)) {
      configuration.setDefaultSerializationFormat(defaultSerializationFormat);
    } else {
      logger.warn("Ignoring invalid defaultSerializationFormat='{}'", defaultSerializationFormat);
    }
  }

}
