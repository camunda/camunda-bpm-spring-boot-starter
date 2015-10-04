package org.camunda.bpm.spring.boot.starter.configuration.impl;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.jdbc.HistoryLevelDeterminator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class DefaultHistoryLevelAutoHandlingConfigurationTest {

  @Mock
  private SpringProcessEngineConfiguration springProcessEngineConfiguration;

  @Mock
  private HistoryLevelDeterminator historyLevelDeterminator;

  private CamundaBpmProperties camundaBpmProperties;

  private DefaultHistoryLevelAutoHandlingConfiguration historyLevelAutoHandlingConfiguration;

  @Before
  public void before() {
    camundaBpmProperties = new CamundaBpmProperties();
    historyLevelAutoHandlingConfiguration = new DefaultHistoryLevelAutoHandlingConfiguration();
    historyLevelAutoHandlingConfiguration.camundaBpmProperties = camundaBpmProperties;
    historyLevelAutoHandlingConfiguration.historyLevelDeterminator = historyLevelDeterminator;
  }

  @Test
  public void applyTest1() {
    when(springProcessEngineConfiguration.getHistory()).thenReturn("audit");
    historyLevelAutoHandlingConfiguration.apply(springProcessEngineConfiguration);
    verify(historyLevelDeterminator, times(0)).determineHistoryLevel();
    verify(springProcessEngineConfiguration, times(0)).setHistory(Mockito.anyString());
  }

  @Test
  public void applyTest2() {
    when(springProcessEngineConfiguration.getHistory()).thenReturn("auto");
    final String historyLevel = "testLevel";
    when(historyLevelDeterminator.determineHistoryLevel()).thenReturn(historyLevel);
    simulateHistoryAutoIsNotSupported();
    historyLevelAutoHandlingConfiguration.apply(springProcessEngineConfiguration);
    verify(historyLevelDeterminator).determineHistoryLevel();
    verify(springProcessEngineConfiguration).setHistory(historyLevel);
  }

  @Test
  public void applyTest3() {
    when(springProcessEngineConfiguration.getHistory()).thenReturn("auto");
    final String historyLevel = null;
    when(historyLevelDeterminator.determineHistoryLevel()).thenReturn(historyLevel);
    simulateHistoryAutoIsNotSupported();
    historyLevelAutoHandlingConfiguration.apply(springProcessEngineConfiguration);
    verify(historyLevelDeterminator).determineHistoryLevel();
    verify(springProcessEngineConfiguration, times(0)).setHistory(Mockito.anyString());
  }

  @Test
  public void needsAdditionalConfigurationTest1() {
    when(springProcessEngineConfiguration.getHistory()).thenReturn("auto");
    simulateHistoryAutoIsNotSupported();
    assertTrue(historyLevelAutoHandlingConfiguration.needsAdditionalConfiguration(springProcessEngineConfiguration));
  }

  @Test
  public void needsAdditionalConfigurationTest2() {
    when(springProcessEngineConfiguration.getHistory()).thenReturn("auto");
    simulateHistoryAutoIsSupported();
    assertFalse(historyLevelAutoHandlingConfiguration.needsAdditionalConfiguration(springProcessEngineConfiguration));
  }

  @Test
  public void needsAdditionalConfigurationTest3() {
    when(springProcessEngineConfiguration.getHistory()).thenReturn("audit");
    simulateHistoryAutoIsNotSupported();
    assertFalse(historyLevelAutoHandlingConfiguration.needsAdditionalConfiguration(springProcessEngineConfiguration));
  }

  @Test
  public void needsAdditionalConfigurationTest4() {
    when(springProcessEngineConfiguration.getHistory()).thenReturn("audit");
    simulateHistoryAutoIsSupported();
    assertFalse(historyLevelAutoHandlingConfiguration.needsAdditionalConfiguration(springProcessEngineConfiguration));
  }

  @Test
  public void isHistoryAutoSupportedTest() {
    simulateHistoryAutoIsSupported();
    assertTrue(historyLevelAutoHandlingConfiguration.isHistoryAutoSupported());

    simulateHistoryAutoIsNotSupported();
    assertFalse(historyLevelAutoHandlingConfiguration.isHistoryAutoSupported());
  }

  private void simulateHistoryAutoIsNotSupported() {
    historyLevelAutoHandlingConfiguration.historyAutoFieldName = "NOT_FOUND_FIELD";
  }

  private void simulateHistoryAutoIsSupported() {
    historyLevelAutoHandlingConfiguration.historyAutoFieldName = "HISTORY_AUDIT";
  }
}
