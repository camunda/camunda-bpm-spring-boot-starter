package org.camunda.bpm.spring.boot.starter.util;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import static org.assertj.core.api.Assertions.assertThat;

public class SpringProcessEnginePluginTest {

  @Rule
  public final MockitoRule mockito = MockitoJUnit.rule();

  private class DummySpringPlugin extends SpringProcessEnginePlugin {


    public boolean preInit;
    public boolean postInit;

    @Override
    public void postInit(SpringProcessEngineConfiguration processEngineConfiguration) {
      postInit = true;
    }

    @Override
    public void preInit(SpringProcessEngineConfiguration processEngineConfiguration) {
      preInit = true;
    }
  }

  @Test
  public void delegate_for_springConfig() throws Exception {
    ProcessEngineConfigurationImpl c = new SpringProcessEngineConfiguration();

    DummySpringPlugin plugin = new DummySpringPlugin();

    plugin.preInit(c);
    plugin.postInit(c);

    assertThat(plugin.preInit).isTrue();
    assertThat(plugin.postInit).isTrue();
  }

  @Test
  public void no_delegate_for_standaloneConfig() throws Exception {
    ProcessEngineConfigurationImpl c = new StandaloneInMemProcessEngineConfiguration();

    DummySpringPlugin plugin = new DummySpringPlugin();

    plugin.preInit(c);
    plugin.postInit(c);

    assertThat(plugin.preInit).isFalse();
    assertThat(plugin.postInit).isFalse();
  }


}
