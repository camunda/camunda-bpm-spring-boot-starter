package org.camunda.bpm.spring.boot.starter.events;

import org.springframework.context.ApplicationEventPublisher;

public class ProcessApplicationEventPublisher {

  private final ApplicationEventPublisher publisher;

  public ProcessApplicationEventPublisher(ApplicationEventPublisher publisher) {
    this.publisher = publisher;
  }

  public void publishProcessApplicationStartedEvent(Object source) {
    publisher.publishEvent(createNewEvent(source));
  }

  protected ProcessApplicationStartedEvent createNewEvent(Object source) {
    return new ProcessApplicationStartedEvent(source);
  }
}
