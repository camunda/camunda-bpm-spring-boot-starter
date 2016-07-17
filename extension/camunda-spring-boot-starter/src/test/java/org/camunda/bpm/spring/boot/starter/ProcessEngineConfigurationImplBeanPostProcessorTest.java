package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ProcessEngineConfigurationImplBeanPostProcessorTest {

  @Mock
  private ProcessEngineConfigurationImpl processEngineConfigurationImplMock;

  @Test
  public void setProcessEnginePluginsWithNoPreconfiguredPluginsTest() {
    List<ProcessEnginePlugin> processEnginePlugins = createUnordedList();
    ProcessEngineConfigurationImplBeanPostProcessor postProcessor = new ProcessEngineConfigurationImplBeanPostProcessor(processEnginePlugins);
    postProcessor.setProcessEnginePlugins(processEngineConfigurationImplMock);
    verify(processEngineConfigurationImplMock).setProcessEnginePlugins(processEnginePlugins);
  }

  @Test
  public void setProcessEnginePluginsWithPreconfiguredPluginsTest() {
    List<ProcessEnginePlugin> processEnginePlugins = createUnordedList();

    ProcessEnginePlugin preconfiguredPlugin = mock(ProcessEnginePlugin.class);
    List<ProcessEnginePlugin> preconfiguredPlugins = new ArrayList<ProcessEnginePlugin>();
    preconfiguredPlugins.add(preconfiguredPlugin);

    List<ProcessEnginePlugin> expectedPluginsList = new ArrayList<ProcessEnginePlugin>();
    expectedPluginsList.addAll(processEnginePlugins);
    expectedPluginsList.addAll(preconfiguredPlugins);

    ProcessEngineConfigurationImplBeanPostProcessor postProcessor = new ProcessEngineConfigurationImplBeanPostProcessor(processEnginePlugins);
    when(processEngineConfigurationImplMock.getProcessEnginePlugins()).thenReturn(preconfiguredPlugins);
    postProcessor.setProcessEnginePlugins(processEngineConfigurationImplMock);

    assertTrue(preconfiguredPlugins.containsAll(expectedPluginsList));
    assertEquals(expectedPluginsList.size(), preconfiguredPlugins.size());
  }

  @Test
  public void postProcessBeforeInitializationNoInteractionTest() {
    assertSame(processEngineConfigurationImplMock,
        new ProcessEngineConfigurationImplBeanPostProcessor(createUnordedList()).postProcessBeforeInitialization(processEngineConfigurationImplMock, null));
    verifyZeroInteractions(processEngineConfigurationImplMock);
  }

  @Test
  public void postProcessAfterInitializationNoInteractionTest() {
    Object testMock = mock(Object.class);
    assertSame(testMock, new ProcessEngineConfigurationImplBeanPostProcessor(createUnordedList()).postProcessAfterInitialization(testMock, null));
    verifyZeroInteractions(testMock);
  }

  @Test
  public void postProcessAfterInitializationInteractionTest() {
    ProcessEngineConfigurationImplBeanPostProcessor spy = spy(new ProcessEngineConfigurationImplBeanPostProcessor(createUnordedList()));
    assertSame(processEngineConfigurationImplMock, spy.postProcessAfterInitialization(processEngineConfigurationImplMock, null));
    verify(spy).setProcessEnginePlugins(processEngineConfigurationImplMock);
  }

  private List<ProcessEnginePlugin> createUnordedList() {
    List<ProcessEnginePlugin> list = new ArrayList<ProcessEnginePlugin>();
    list.add(mock(ProcessEnginePlugin.class));
    list.add(mock(ProcessEnginePlugin.class));
    return list;
  }

}
