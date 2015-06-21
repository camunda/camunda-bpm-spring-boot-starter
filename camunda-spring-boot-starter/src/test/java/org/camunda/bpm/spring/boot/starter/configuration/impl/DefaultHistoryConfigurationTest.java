package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.impl.history.handler.HistoryEventHandler;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class DefaultHistoryConfigurationTest {

  @Mock
  private SpringProcessEngineConfiguration springProcessEngineConfiguration;

  private CamundaBpmProperties camundaBpmProperties;

  private DefaultHistoryConfiguration defaultHistoryConfiguration;

  @Before
  public void before() {
    camundaBpmProperties = new CamundaBpmProperties();
    defaultHistoryConfiguration = new DefaultHistoryConfiguration();
    defaultHistoryConfiguration.camundaBpmProperties = camundaBpmProperties;
  }

  @Test
  public void noHistoryLevelTest() {
    defaultHistoryConfiguration.apply(springProcessEngineConfiguration);
    verify(springProcessEngineConfiguration, times(0)).setHistoryLevel(
      Mockito.any(HistoryLevel.class));
  }

  @Test
  public void historyLevelTest() {
    camundaBpmProperties.setHistoryLevel(HistoryLevel.HISTORY_LEVEL_FULL.getName());
    defaultHistoryConfiguration.apply(springProcessEngineConfiguration);
    verify(springProcessEngineConfiguration).setHistoryLevel(
      HistoryLevel.HISTORY_LEVEL_FULL);
  }

  @Test
  public void noHistoryEventHandlerTest() {
    defaultHistoryConfiguration.apply(springProcessEngineConfiguration);
    verify(springProcessEngineConfiguration, times(0)).setHistoryEventHandler(
      Mockito.any(HistoryEventHandler.class));
  }

  @Test
  public void historyEventHandlerTest() {
    HistoryEventHandler historyEventHandlerMock = mock(HistoryEventHandler.class);
    defaultHistoryConfiguration.historyEventHandler = historyEventHandlerMock;
    defaultHistoryConfiguration.apply(springProcessEngineConfiguration);
    verify(springProcessEngineConfiguration).setHistoryEventHandler(
      historyEventHandlerMock);
  }
}
