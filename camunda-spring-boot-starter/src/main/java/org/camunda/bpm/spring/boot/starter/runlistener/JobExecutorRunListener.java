package org.camunda.bpm.spring.boot.starter.runlistener;

import org.camunda.bpm.engine.impl.jobexecutor.JobExecutor;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;

public class JobExecutorRunListener extends AbstractFinishedWithNoExceptionRunListener {

  private static final Logger LOGGER = LoggerFactory.getLogger(JobExecutorRunListener.class);

  public JobExecutorRunListener(SpringApplication application, String[] args) {
    super(application, args);
  }

  @Override
  protected void finishedWithNoException(ConfigurableApplicationContext context, CamundaBpmProperties camundaBpmProperties) {
    JobExecutor jobExecutor = getBeanQuietly(context, JobExecutor.class);
    if (jobExecutor != null) {
      activate(jobExecutor, camundaBpmProperties);
    } else {
      LOGGER.info("no job executor found to activate");
    }
  }

  @Override
  protected Logger getLogger() {
    return LOGGER;
  }

  private void activate(JobExecutor jobExecutor, CamundaBpmProperties camundaBpmProperties) {
    if (camundaBpmProperties.isJobExecutorActive()) {
      if (!jobExecutor.isActive()) {
        jobExecutor.start();
      } else {
        LOGGER.info("job executor is already active");
      }
    } else {
      LOGGER.info("job activation is deactivated");
    }
  }

}
