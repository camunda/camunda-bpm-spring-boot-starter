package org.camunda.bpm.spring.boot.starter.runlistener;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.camunda.bpm.engine.impl.jobexecutor.JobExecutor;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties.JobExecution;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ConfigurableApplicationContext;

@RunWith(MockitoJUnitRunner.class)
public class JobExecutorRunListenerTest {

  @Mock
  private ConfigurableApplicationContext context;

  @Mock
  private JobExecutor jobExecutor;

  @Mock
  private CamundaBpmProperties camundaBpmProperties;

  @Mock
  private JobExecution jobExecution;

  @Before
  public void init() {
    when(context.getBean(JobExecutor.class)).thenReturn(jobExecutor);
    when(context.getBean(CamundaBpmProperties.class)).thenReturn(camundaBpmProperties);
    when(camundaBpmProperties.getJobExecution()).thenReturn(jobExecution);
    when(jobExecution.isActive()).thenReturn(true);
    when(jobExecutor.isActive()).thenReturn(false);
  }

  @Test
  public void failedContextTest() {
    new JobExecutorRunListener(null, null).finished(context, new IllegalStateException());
    verify(jobExecutor, times(0)).start();
  }

  @Test
  public void noJobExecutorTest() {
    when(context.getBean(JobExecutor.class)).thenReturn(null);
    new JobExecutorRunListener(null, null).finished(context, null);
    verify(jobExecutor, times(0)).start();
  }

  @Test
  public void noJobExecutorExceptionTest() {
    when(context.getBean(JobExecutor.class)).thenThrow(new NoSuchBeanDefinitionException(JobExecutor.class));
    new JobExecutorRunListener(null, null).finished(context, null);
    verify(jobExecutor, times(0)).start();
  }

  @Test(expected = NoSuchBeanDefinitionException.class)
  public void noCamundaBpmPropertiesTest() {
    when(context.getBean(CamundaBpmProperties.class)).thenThrow(new NoSuchBeanDefinitionException(CamundaBpmProperties.class));
    new JobExecutorRunListener(null, null).finished(context, null);
  }

  @Test
  public void disabledJobActivationTest() {
    when(camundaBpmProperties.getJobExecution().isActive()).thenReturn(false);
    new JobExecutorRunListener(null, null).finished(context, null);
    verify(jobExecutor, times(0)).start();
  }

  @Test
  public void jobExecutorAlreadyStartedTest() {
    when(jobExecutor.isActive()).thenReturn(true);
    new JobExecutorRunListener(null, null).finished(context, null);
    verify(jobExecutor, times(0)).start();
  }

  @Test
  public void jobExecutorStartedTest() {
    new JobExecutorRunListener(null, null).finished(context, null);
    verify(jobExecutor, times(1)).start();
  }
}
