package org.camunda.bpm.spring.boot.starter.configuration.impl;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;

import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.impl.cfg.AbstractProcessEnginePlugin;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

public class DefaultProcessEngineConfigurationTest {

  private final DefaultProcessEngineConfiguration instance = new DefaultProcessEngineConfiguration();

  private final SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();

  private final CamundaBpmProperties properties = new CamundaBpmProperties();

  @Before
  public void setUp() throws Exception {
    ReflectionTestUtils.setField(instance, "camundaBpmProperties", properties);
  }

  @Test
  public void setName_if_not_empty() throws Exception {
    properties.setProcessEngineName("foo");
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo("foo");
  }

  @Test
  public void setName_ignore_empty() throws Exception {
    properties.setProcessEngineName(null);
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);

    properties.setProcessEngineName(" ");
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);
  }

  @Test
  public void setName_ignore_hyphen() throws Exception {
    properties.setProcessEngineName("foo-bar");
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);
  }

  @Test
  public void addPlugins_ignore_when_empty() throws Exception {
    ProcessEnginePlugin a = new AbstractProcessEnginePlugin();
    configuration.getProcessEnginePlugins().add(a);

    // injectedPlugins = null
    instance.preInit(configuration);
    assertThat(configuration.getProcessEnginePlugins()).containsOnly(a);

    // injected plugins = empty collection
    ReflectionTestUtils.setField(instance, "processEnginePlugins", Arrays.asList());
    instance.preInit(configuration);
    assertThat(configuration.getProcessEnginePlugins()).containsExactly(a);
  }

  @Test
  public void addPlugins_add_injected_plugins_without_deleting_existing() throws Exception {
    ProcessEnginePlugin a = new AbstractProcessEnginePlugin();
    configuration.getProcessEnginePlugins().add(a);

    ProcessEnginePlugin b = new AbstractProcessEnginePlugin();
    ReflectionTestUtils.setField(instance, "processEnginePlugins", Arrays.asList(b));

    instance.preInit(configuration);
    assertThat(configuration.getProcessEnginePlugins()).containsExactly(a, b);
  }
}
