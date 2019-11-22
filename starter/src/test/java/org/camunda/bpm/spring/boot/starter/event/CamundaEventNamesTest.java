package org.camunda.bpm.spring.boot.starter.event;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;
import org.assertj.core.api.Assertions;
import org.camunda.bpm.engine.delegate.CaseExecutionListener;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.TaskListener;
import org.junit.Test;

public class CamundaEventNamesTest {


  @Test
  public void containsAllTaskEvents_except_timeout() {

    Set<String> expected = readConstantsFromInterface(TaskListener.class);
    expected.remove(TaskListener.EVENTNAME_TIMEOUT);


    assertThat(CamundaEventNames.TASK_EVENTS)
      .containsExactlyInAnyOrderElementsOf(expected);

  }

  @Test
  public void containsAllExecutionEvents_except_take() {
    Set<String> expected = readConstantsFromInterface(ExecutionListener.class);
    expected.remove(ExecutionListener.EVENTNAME_TAKE);


    assertThat(CamundaEventNames.EXECUTION_EVENTS)
      .containsExactlyInAnyOrderElementsOf(expected);

  }

  @Test
  public void containsAllCaseExecutionEvents() {
    Set<String> expected = readConstantsFromInterface(CaseExecutionListener.class);

    assertThat(CamundaEventNames.CASE_EXECUTION_EVENTS)
      .containsExactlyInAnyOrderElementsOf(expected);

  }

  private static Set<String> readConstantsFromInterface(Class<?> listenerInterface) {

    Set<String> events = new HashSet<>();

    for (Field field : listenerInterface.getDeclaredFields()) {
      String event = null;
      try {
        event = (String) field.get(null);
      } catch (IllegalAccessException e) {
        fail(e.getMessage());
      }
      events.add(event);
    }

    return events;
  }
}
