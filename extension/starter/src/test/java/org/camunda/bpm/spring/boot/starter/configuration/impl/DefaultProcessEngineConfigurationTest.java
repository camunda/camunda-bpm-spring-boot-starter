package org.camunda.bpm.spring.boot.starter.configuration.impl;

import static org.assertj.core.api.Assertions.assertThat;

import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.generic.SpringProcessEngineConfigurationTemplate;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

public class DefaultProcessEngineConfigurationTest {

  private final DefaultProcessEngineConfiguration instance = new DefaultProcessEngineConfiguration();

  private final SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();

  private final CamundaBpmProperties properties = new CamundaBpmProperties();

  private final SpringProcessEngineConfigurationTemplate springProcessEngineConfigurationTemplate = new SpringProcessEngineConfigurationTemplate(
      new SpringProcessEngineConfiguration());

  @Before
  public void setUp() throws Exception {
    ReflectionTestUtils.setField(instance, "camundaBpmProperties", properties);
    ReflectionTestUtils.setField(instance, "springProcessEngineConfigurationTemplate", springProcessEngineConfigurationTemplate);
  }

  @Test
  public void setName_if_not_empty() throws Exception {
    springProcessEngineConfigurationTemplate.getTemplate().setProcessEngineName("foo");
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo("foo");
  }

  @Test
  public void setName_ignore_empty() throws Exception {
    springProcessEngineConfigurationTemplate.getTemplate().setProcessEngineName(null);
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);

    springProcessEngineConfigurationTemplate.getTemplate().setProcessEngineName(" ");
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);
  }

  @Test
  public void setName_ignore_hyphen() throws Exception {
    springProcessEngineConfigurationTemplate.getTemplate().setProcessEngineName("foo-bar");
    instance.preInit(configuration);
    assertThat(configuration.getProcessEngineName()).isEqualTo(ProcessEngines.NAME_DEFAULT);
  }

  @Test
  public void setDefaultSerializationFormat() {
    final String defaultSerializationFormat = "testformat";
    springProcessEngineConfigurationTemplate.getTemplate().setDefaultSerializationFormat(defaultSerializationFormat);
    instance.preInit(configuration);
    assertThat(configuration.getDefaultSerializationFormat()).isSameAs(defaultSerializationFormat);
  }

  @Test
  public void setDefaultSerializationFormat_ignore_null() {
    final String defaultSerializationFormat = configuration.getDefaultSerializationFormat();
    springProcessEngineConfigurationTemplate.getTemplate().setDefaultSerializationFormat(null);
    instance.preInit(configuration);
    assertThat(configuration.getDefaultSerializationFormat()).isEqualTo(defaultSerializationFormat);
  }

  @Test
  public void setDefaultSerializationFormat_ignore_empty() {
    final String defaultSerializationFormat = configuration.getDefaultSerializationFormat();
    springProcessEngineConfigurationTemplate.getTemplate().setDefaultSerializationFormat(" ");
    instance.preInit(configuration);
    assertThat(configuration.getDefaultSerializationFormat()).isEqualTo(defaultSerializationFormat);
  }
}
