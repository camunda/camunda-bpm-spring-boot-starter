package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.jobexecutor.JobHandler;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaJobConfiguration;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.ReflectionTestUtils.setField;

public class DefaultJobConfigurationTest {

  private final SpringProcessEngineConfiguration processEngineConfiguration = new SpringProcessEngineConfiguration();
  private final DefaultJobConfiguration jobConfiguration = new DefaultJobConfiguration();
  private final CamundaBpmProperties properties = new CamundaBpmProperties();

  @Before
  public void setUp() {
    setField(jobConfiguration, "camundaBpmProperties", properties);
  }

  @Test
  public void delegate_to_specialized_configurations() {
    CamundaJobConfiguration p = mock(CamundaJobConfiguration.class);
    CamundaJobConfiguration r = mock(CamundaJobConfiguration.class);

    setField(jobConfiguration, "configureJobExecutor", p);
    setField(jobConfiguration, "registerCustomJobHandlers", r);

    jobConfiguration.apply(processEngineConfiguration);
    verify(p).apply(processEngineConfiguration);
    verify(r).apply(processEngineConfiguration);
  }

  @Test
  public void addJobHandler() {
    JobHandler jobHandler = mock(JobHandler.class);
    when(jobHandler.getType()).thenReturn("MockHandler");
    setField(jobConfiguration, "customJobHandlers", Arrays.asList(jobHandler));

    assertThat(processEngineConfiguration.getCustomJobHandlers()).isNull();
    jobConfiguration.registerCustomJobHandlers.apply(processEngineConfiguration);

    assertThat(processEngineConfiguration.getCustomJobHandlers()).containsOnly(jobHandler);
  }


}
