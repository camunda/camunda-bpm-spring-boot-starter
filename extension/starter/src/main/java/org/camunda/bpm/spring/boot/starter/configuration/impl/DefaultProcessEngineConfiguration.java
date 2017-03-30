package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.persistence.StrongUuidGenerator;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration;
import org.springframework.util.StringUtils;

public class DefaultProcessEngineConfiguration extends AbstractCamundaConfiguration implements CamundaProcessEngineConfiguration {

  @Override
  public void preInit(SpringProcessEngineConfiguration configuration) {
    String processEngineName = StringUtils.trimAllWhitespace(camundaBpmProperties.getProcessEngineName());
    if (!StringUtils.isEmpty(processEngineName) && !processEngineName.contains("-")) {
      configuration.setProcessEngineName(processEngineName);
    } else {
      logger.warn("Ignoring invalid processEngineName='{}' - must not be null, blank or contain hyphen", camundaBpmProperties.getProcessEngineName());
    }

    String defaultSerializationFormat = camundaBpmProperties.getDefaultSerializationFormat();
    if (StringUtils.hasText(defaultSerializationFormat)) {
      configuration.setDefaultSerializationFormat(defaultSerializationFormat);
    } else {
      logger.warn("Ignoring invalid defaultSerializationFormat='{}'", defaultSerializationFormat);
    }
    
    configuration.setIdGenerator(new StrongUuidGenerator());
  }

}
