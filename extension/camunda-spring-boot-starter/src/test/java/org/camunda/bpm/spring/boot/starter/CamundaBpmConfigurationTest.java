package org.camunda.bpm.spring.boot.starter;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.junit.Test;

public class CamundaBpmConfigurationTest {

  @Test
  public void processEngineConfigurationImplTest() {
    CamundaBpmConfiguration camundaBpmConfiguration = new CamundaBpmConfiguration();
    List<CamundaConfiguration> camundaConfigurations = createUnordedList();
    camundaBpmConfiguration.camundaConfigurations = camundaConfigurations;
    ProcessEngineConfigurationImpl processEngineConfigurationImpl = camundaBpmConfiguration.processEngineConfigurationImpl();
    for (CamundaConfiguration camundaConfiguration : camundaConfigurations) {
      verify(camundaConfiguration).apply((SpringProcessEngineConfiguration) processEngineConfigurationImpl);
    }
  }

  private List<CamundaConfiguration> createUnordedList() {
    List<CamundaConfiguration> list = new ArrayList<CamundaConfiguration>();
    list.add(mock(CamundaConfiguration.class));
    list.add(mock(CamundaConfiguration.class));
    return list;
  }

}
