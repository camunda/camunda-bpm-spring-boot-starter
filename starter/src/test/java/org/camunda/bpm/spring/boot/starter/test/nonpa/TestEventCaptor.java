package org.camunda.bpm.spring.boot.starter.test.nonpa;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.DelegateTask;
import org.camunda.bpm.engine.impl.history.event.HistoryEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Stack;

@Component
public class TestEventCaptor {

  public Stack<HistoryEvent> historyEvents = new Stack<>();
  public Stack<TaskEvent> taskEvents = new Stack<>();
  public Stack<ExecutionEvent> executionEvents = new Stack<>();

  @EventListener
  public void onEvent(HistoryEvent event) {
    historyEvents.push(event);
  }

  @EventListener
  public void onEvent(DelegateExecution event) {
    executionEvents.push(new ExecutionEvent(event));
  }

  @EventListener
  public void onEvent(DelegateTask event) {
    taskEvents.push(new TaskEvent(event));
  }

  public static class ExecutionEvent {
    public final String id;
    public final String processInstanceId;
    public final String activityId;

    public ExecutionEvent(DelegateExecution execution) {
      this.id = execution.getId();
      this.processInstanceId = execution.getProcessInstanceId();
      this.activityId = execution.getCurrentActivityId();
    }
  }

  public static class TaskEvent {
    public final String id;
    public final String processInstanceId;
    public final String eventName;

    public TaskEvent(DelegateTask task) {
      this.id = task.getId();
      this.processInstanceId = task.getProcessInstanceId();
      this.eventName = task.getEventName();
    }
  }

}
