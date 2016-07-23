package org.camunda.bpm.spring.boot.starter.events;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;

public class ProcessApplicationEventPublisher {

  private final ApplicationEventPublisher publisher;

  public ProcessApplicationEventPublisher(ApplicationEventPublisher publisher) {
    this.publisher = publisher;
  }

  @EventListener
  public void handleApplicationReadyEvent(ApplicationReadyEvent applicationReadyEvent) {
    publishProcessApplicationStartedEvent(applicationReadyEvent);
  }

  protected void publishProcessApplicationStartedEvent(Object source) {
    publisher.publishEvent(createNewEvent(source));
  }

  protected ProcessApplicationStartedEvent createNewEvent(Object source) {
    return new ProcessApplicationStartedEvent(source);
  }
}
