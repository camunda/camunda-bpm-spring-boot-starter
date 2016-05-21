package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaHistoryLevelAutoHandlingConfiguration;
import org.camunda.bpm.spring.boot.starter.jdbc.HistoryLevelDeterminator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.util.StringUtils;

@Order(CamundaConfiguration.DEFAULT_ORDER + 1)
public class DefaultHistoryLevelAutoHandlingConfiguration extends AbstractCamundaConfiguration implements CamundaHistoryLevelAutoHandlingConfiguration {

  @Autowired
  protected HistoryLevelDeterminator historyLevelDeterminator;

  @Override
  public void alter(SpringProcessEngineConfiguration configuration) {
    final String determineHistoryLevel = historyLevelDeterminator.determineHistoryLevel();
    if (!StringUtils.isEmpty(determineHistoryLevel)) {
      configuration.setHistory(determineHistoryLevel);
    }
  }
}
