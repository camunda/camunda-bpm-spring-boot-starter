package org.camunda.bpm.spring.boot.starter.events;

import org.springframework.context.ApplicationEvent;

public class ProcessApplicationStartedEvent extends ApplicationEvent {

  private static final long serialVersionUID = 8052917038949847157L;

  public ProcessApplicationStartedEvent(Object source) {
    super(source);
  }

}
