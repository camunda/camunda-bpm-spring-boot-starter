package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.impl.cfg.AbstractProcessEnginePlugin;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.junit.MockitoRule;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

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
    instance.accept(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo("foo");
  }
  @Test
  public void setName_ignore_empty() throws Exception {
    properties.setProcessEngineName(null);
    instance.accept(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);

    properties.setProcessEngineName(" ");
    instance.accept(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);
  }

  @Test
  public void setName_ignore_hyphen() throws Exception {
    properties.setProcessEngineName("foo-bar");
    instance.accept(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);
  }

  @Test
  public void addPlugins_ignore_when_empty() throws Exception {
    ProcessEnginePlugin a = new AbstractProcessEnginePlugin();
    configuration.getProcessEnginePlugins().add(a);

    // injectedPlugins = null
    instance.accept(configuration);
    assertThat(configuration.getProcessEnginePlugins()).containsOnly(a);

    // injected plugins = empty collection
    ReflectionTestUtils.setField(instance, "processEnginePlugins", Arrays.asList());
    instance.accept(configuration);
    assertThat(configuration.getProcessEnginePlugins()).containsExactly(a);
  }

  @Test
  public void addPlugins_add_injected_plugins_without_deleting_existing() throws Exception {
    ProcessEnginePlugin a = new AbstractProcessEnginePlugin();
    configuration.getProcessEnginePlugins().add(a);

    ProcessEnginePlugin b = new AbstractProcessEnginePlugin();
    ReflectionTestUtils.setField(instance, "processEnginePlugins", Arrays.asList(b));

    instance.accept(configuration);
    assertThat(configuration.getProcessEnginePlugins()).containsExactly(a,b);
  }
}
