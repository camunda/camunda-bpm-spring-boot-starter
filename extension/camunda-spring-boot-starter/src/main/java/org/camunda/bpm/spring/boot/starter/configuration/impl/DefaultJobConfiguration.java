package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.jobexecutor.CallerRunsRejectedJobsHandler;
import org.camunda.bpm.engine.impl.jobexecutor.JobExecutor;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.engine.spring.components.jobexecutor.SpringJobExecutor;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaJobConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

public class DefaultJobConfiguration extends AbstractCamundaConfiguration implements CamundaJobConfiguration {

  @Autowired
  protected JobExecutor jobExecutor;

  @Override
  public void apply(SpringProcessEngineConfiguration configuration) {
    // note: the job executor will be activated in
    // org.camunda.bpm.spring.boot.starter.runlistener.JobExecutorRunListener
    configuration.setJobExecutorActivate(false);
    configuration.setJobExecutorDeploymentAware(camundaBpmProperties.getJobExecution().isDeploymentAware());
    configuration.setJobExecutor(jobExecutor);
  }

  public static class JobConfiguration {

    @Bean
    @ConditionalOnMissingBean(TaskExecutor.class)
    @ConditionalOnProperty(prefix = "camunda.bpm.job-execution", name = "enabled", havingValue = "true", matchIfMissing = true)
    public static TaskExecutor taskExecutor() {
      return new ThreadPoolTaskExecutor();
    }

    @Bean
    @ConditionalOnMissingBean(JobExecutor.class)
    @ConditionalOnProperty(prefix = "camunda.bpm.job-execution", name = "enabled", havingValue = "true", matchIfMissing = true)
    public static JobExecutor jobExecutor(TaskExecutor taskExecutor) {
      SpringJobExecutor springJobExecutor = new SpringJobExecutor();
      springJobExecutor.setTaskExecutor(taskExecutor);
      springJobExecutor.setRejectedJobsHandler(new CallerRunsRejectedJobsHandler());
      return springJobExecutor;
    }

  }
}
