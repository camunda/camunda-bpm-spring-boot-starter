package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.impl.history.handler.HistoryEventHandler;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaHistoryConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class DefaultHistoryConfiguration extends AbstractCamundaConfiguration implements
  CamundaHistoryConfiguration {

  private static final Logger LOGGER = LoggerFactory
    .getLogger(DefaultHistoryConfiguration.class);

  @Autowired(required = false)
  protected HistoryEventHandler historyEventHandler;

  @Override
  public void apply(SpringProcessEngineConfiguration configuration) {
    HistoryLevel historyLevel = camundaBpmProperties.getHistoryLevel();
    if (historyLevel != null) {
      configuration.setHistoryLevel(historyLevel);
    }
    if (historyEventHandler != null) {
      LOGGER.debug("registered history event handler: {}",
        historyEventHandler.getClass());
      configuration.setHistoryEventHandler(historyEventHandler);
    }
  }

}
