package org.camunda.bpm.spring.boot.starter.test.nonpa;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component("eventingServiceTask")
public class EventingServiceTask implements JavaDelegate {

  @Override
  public void execute(DelegateExecution delegateExecution) throws Exception {
    // NOTHING TO DO HERE
  }
}
