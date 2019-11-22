package org.camunda.bpm.spring.boot.starter.event;

import java.util.Arrays;
import java.util.List;
import org.camunda.bpm.engine.delegate.CaseExecutionListener;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.TaskListener;

public enum CamundaEventNames {
  ;

  public static final List<String> TASK_EVENTS = Arrays.asList(
    TaskListener.EVENTNAME_COMPLETE,
    TaskListener.EVENTNAME_ASSIGNMENT,
    TaskListener.EVENTNAME_CREATE,
    TaskListener.EVENTNAME_DELETE,
    TaskListener.EVENTNAME_UPDATE
  );

  public static final List<String> EXECUTION_EVENTS = Arrays.asList(
    ExecutionListener.EVENTNAME_START,
    ExecutionListener.EVENTNAME_END
  );

  public static final List<String> CASE_EXECUTION_EVENTS = Arrays.asList(
    CaseExecutionListener.CLOSE,
    CaseExecutionListener.COMPLETE,
    CaseExecutionListener.CREATE,
    CaseExecutionListener.DISABLE,
    CaseExecutionListener.ENABLE,
    CaseExecutionListener.EXIT,
    CaseExecutionListener.MANUAL_START,
    CaseExecutionListener.OCCUR,
    CaseExecutionListener.PARENT_RESUME,
    CaseExecutionListener.PARENT_TERMINATE,
    CaseExecutionListener.PARENT_SUSPEND,
    CaseExecutionListener.RE_ACTIVATE,
    CaseExecutionListener.RE_ENABLE,
    CaseExecutionListener.RESUME,
    CaseExecutionListener.START,
    CaseExecutionListener.SUSPEND,
    CaseExecutionListener.TERMINATE
  );
}
