package org.camunda.bpm.spring.boot.starter.events;

import org.springframework.beans.BeansException;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;

public class ProcessApplicationEventPublisher implements ApplicationContextAware {

  private final ApplicationEventPublisher publisher;
  private ApplicationContext parentContext;

  public ProcessApplicationEventPublisher(ApplicationEventPublisher publisher) {
    this.publisher = publisher;
  }

  @EventListener
  public void handleApplicationReadyEvent(ApplicationReadyEvent applicationReadyEvent) {
    publishProcessApplicationEvent(createNewProcessApplicationStartedEvent(applicationReadyEvent));
  }

  @EventListener
  public void handleContextStoppedEvent(ContextClosedEvent contextStoppedEvent) {
    if (parentContext == contextStoppedEvent.getApplicationContext()) {
      publishProcessApplicationEvent(createNewProcessApplicationStoppedEvent(contextStoppedEvent));
    }
  }

  protected void publishProcessApplicationEvent(ProcessApplicationEvent processApplicationEvent) {
    publisher.publishEvent(processApplicationEvent);
  }

  protected ProcessApplicationStartedEvent createNewProcessApplicationStartedEvent(Object source) {
    return new ProcessApplicationStartedEvent(source);
  }

  protected ProcessApplicationStoppedEvent createNewProcessApplicationStoppedEvent(Object source) {
    return new ProcessApplicationStoppedEvent(source);
  }

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    this.parentContext = applicationContext;
  }
}
