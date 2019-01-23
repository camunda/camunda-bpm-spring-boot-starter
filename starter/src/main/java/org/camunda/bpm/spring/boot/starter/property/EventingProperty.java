package org.camunda.bpm.spring.boot.starter.property;

import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.joinOn;

/**
 * Properties controlling spring eventing.
 */
public class EventingProperty {

  /**
   * Controls events of execution listener.
   */
  private boolean execution = true;
  /**
   * Controls events of task listener.
   */
  private boolean task = true;
  /**
   * Controls events of history handler.
   */
  private boolean history = true;

  public boolean isExecution() {
    return execution;
  }

  public void setExecution(boolean execution) {
    this.execution = execution;
  }

  public boolean isTask() {
    return task;
  }

  public void setTask(boolean task) {
    this.task = task;
  }

  public boolean isHistory() {
    return history;
  }

  public void setHistory(boolean history) {
    this.history = history;
  }

  @Override
  public String toString() {
    return joinOn(this.getClass())
      .add("execution=" + execution)
      .add("task=" + task)
      .add("history=" + history)
      .toString();
  }
}
