package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

import java.util.ArrayList;
import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.junit.Test;

public class CamundaBpmConfigurationTest {

  @Test
  public void processEngineConfigurationImplTest() {
    CamundaBpmConfiguration camundaBpmConfiguration = new CamundaBpmConfiguration();
    List<ProcessEnginePlugin> processEnginePlugins = createUnordedList();
    camundaBpmConfiguration.processEnginePlugins = processEnginePlugins;
    ProcessEngineConfigurationImpl processEngineConfigurationImpl = camundaBpmConfiguration.processEngineConfigurationImpl();
    assertEquals(processEnginePlugins, processEngineConfigurationImpl.getProcessEnginePlugins());
  }

  private List<ProcessEnginePlugin> createUnordedList() {
    List<ProcessEnginePlugin> list = new ArrayList<ProcessEnginePlugin>();
    list.add(mock(ProcessEnginePlugin.class));
    list.add(mock(ProcessEnginePlugin.class));
    return list;
  }

}
