package org.camunda.bpm.spring.boot.example.simple;

import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareAssertions.assertThat;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.complete;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.execute;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.job;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.runtimeService;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.task;
import static org.camunda.bpm.extension.mockito.DelegateExpressions.autoMock;

import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.test.Deployment;
import org.camunda.bpm.spring.boot.starter.test.helper.AbstractProcessEngineRuleTest;
import org.junit.Test;

/**
 * Ensure the sample.bpmn Process is working correctly.
 */
@Deployment(resources = "bpmn/sample.bpmn")
public class SampleProcessTest extends AbstractProcessEngineRuleTest {

  @Test
  public void start_and_finish_process() {
    autoMock("bpmn/sample.bpmn");

    final ProcessInstance processInstance = runtimeService().startProcessInstanceByKey("Sample");

    assertThat(processInstance).isWaitingAt("UserTask_1");

    complete(task());

    assertThat(processInstance).isWaitingAt("ServiceTask_1");
    execute(job());

    assertThat(processInstance).isEnded();
  }
}
