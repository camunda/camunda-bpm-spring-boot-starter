package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.camunda.bpm.spring.boot.starter.jdbc.HistoryLevelDeterminator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.util.ReflectionUtils;

@Order(CamundaConfiguration.DEFAULT_ORDER + 1)
public class HistoryLevelAutoHandlingConfiguration extends AbstractCamundaConfiguration {

  protected static final String HISTORY_AUTO = "auto";

  protected String historyAutoFieldName = "HISTORY_AUTO";

  @Autowired
  protected HistoryLevelDeterminator historyLevelDeterminator;

  @Override
  public void apply(SpringProcessEngineConfiguration configuration) {
    if (needsAdditionalConfiguration(configuration)) {
      String determineHistoryLevel = historyLevelDeterminator.determineHistoryLevel();
      if (determineHistoryLevel != null) {
        configuration.setHistory(determineHistoryLevel);
      }
    }
  }

  protected boolean needsAdditionalConfiguration(SpringProcessEngineConfiguration configuration) {
    if (HISTORY_AUTO.equals(configuration.getHistory())) {
      return !isHistoryAutoSupported();
    }
    return false;
  }

  protected boolean isHistoryAutoSupported() {
    return ReflectionUtils.findField(ProcessEngineConfiguration.class, historyAutoFieldName) != null;
  }

  /**
   * @return the historyAutoFieldName
   */
  public String getHistoryAutoFieldName() {
    return historyAutoFieldName;
  }

  /**
   * @param historyAutoFieldName
   *          the historyAutoFieldName to set
   */
  public void setHistoryAutoFieldName(String historyAutoFieldName) {
    this.historyAutoFieldName = historyAutoFieldName;
  }

}
