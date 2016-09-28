package org.camunda.bpm.spring.boot.starter.event;

import org.camunda.bpm.engine.impl.jobexecutor.JobExecutor;
import org.camunda.bpm.spring.boot.starter.SpringProcessEngineConfigurationTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;

public class JobExecutorStartingEventListener {

  private static final Logger LOGGER = LoggerFactory.getLogger(JobExecutorStartingEventListener.class);

  @Autowired
  protected JobExecutor jobExecutor;

  @Autowired
  protected SpringProcessEngineConfigurationTemplate springProcessEngineConfigurationTemplate;

  @EventListener
  public void handleProcessApplicationStartedEvent(ProcessApplicationStartedEvent processApplicationStartedEvent) {
    if (springProcessEngineConfigurationTemplate.getTemplate().isJobExecutorActivate()) {
      activate();
    }
  }

  protected void activate() {
    if (!jobExecutor.isActive()) {
      jobExecutor.start();
    } else {
      LOGGER.info("job executor is already active");
    }
  }

}
