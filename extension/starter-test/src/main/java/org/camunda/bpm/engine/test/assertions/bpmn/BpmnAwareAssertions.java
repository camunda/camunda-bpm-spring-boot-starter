package org.camunda.bpm.engine.test.assertions.bpmn;

import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.runtime.Job;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;

/**
 * Convenience class to access only camunda *BPMN* related Assertions. 
 * Usage is optional, if you only need BPMN Assertions and mandatory 
 * if you still use Camunda BPM <= 7.1. 
 * 
 * Use it with a static import:
 *
 * import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareAssertions.*;
 *
 * @see org.camunda.bpm.engine.test.assertions.ProcessEngineAssertions
 *      for all Camunda BPM Assertions  
 * @see org.camunda.bpm.engine.test.assertions.ProcessEngineTests
 *      for full Camunda BPM Assert functionality PLUS helper methods  
 *
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public class BpmnAwareAssertions extends AbstractAssertions {

  protected BpmnAwareAssertions() {}

  /**
   * Assert that... the given ProcessDefinition meets your expectations.
   *
   * @param   actual ProcessDefinition under test
   * @return  Assert object offering ProcessDefinition specific assertions.
   */
  public static ProcessDefinitionAssert assertThat(final ProcessDefinition actual) {
    return ProcessDefinitionAssert.assertThat(processEngine(), actual);
  }

  /**
   * Assert that... the given ProcessInstance meets your expectations.
   *
   * @param   actual ProcessInstance under test
   * @return  Assert object offering ProcessInstance specific assertions.
   */
  public static ProcessInstanceAssert assertThat(final ProcessInstance actual) {
    return ProcessInstanceAssert.assertThat(processEngine(), actual);
  }

  /**
   * Assert that... the given Task meets your expectations.
   *
   * @param   actual Task under test
   * @return  Assert object offering Task specific assertions.
   */
  public static TaskAssert assertThat(final Task actual) {
    return TaskAssert.assertThat(processEngine(), actual);
  }

  /**
   * Assert that... the given Job meets your expectations.
   *
   * @param   actual Job under test
   * @return  Assert object offering Job specific assertions.
   */
  public static JobAssert assertThat(final Job actual) {
    return JobAssert.assertThat(processEngine(), actual);
  }
  
}
