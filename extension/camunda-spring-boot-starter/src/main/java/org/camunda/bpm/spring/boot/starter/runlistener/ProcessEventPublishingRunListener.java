package org.camunda.bpm.spring.boot.starter.runlistener;

import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.events.ProcessApplicationEventPublisher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;

public class ProcessEventPublishingRunListener extends AbstractFinishedWithNoExceptionRunListener {

  private static final Logger LOGGER = LoggerFactory.getLogger(ProcessEventPublishingRunListener.class);

  public ProcessEventPublishingRunListener(SpringApplication application, String[] args) {
    super(application, args);
  }

  @Override
  protected Logger getLogger() {
    return LOGGER;
  }

  @Override
  protected void finishedWithNoException(ConfigurableApplicationContext context, CamundaBpmProperties camundaBpmProperties) {
    ProcessApplicationEventPublisher processApplicationEventPublisher = getBeanQuietly(context, ProcessApplicationEventPublisher.class);
    if (processApplicationEventPublisher != null) {
      processApplicationEventPublisher.publishProcessApplicationStartedEvent(this);
    }
  }

}
