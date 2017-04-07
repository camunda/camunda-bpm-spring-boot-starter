package org.camunda.bpm.engine.test.assertions.cmmn;

import org.camunda.bpm.engine.repository.CaseDefinition;
import org.camunda.bpm.engine.runtime.CaseExecution;
import org.camunda.bpm.engine.runtime.CaseInstance;
import org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareAssertions;
import org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests;

/**
 * Convenience class to access camunda *BPMN* and *CMMN* 
 * related Assertions. Use it with a static import:
 *
 * import static org.camunda.bpm.engine.test.assertions.cmmn.CmmnAwareAssertions.*;
 *
 * @author Martin Schimak <martin.schimak@plexiti.com>
 * @author Martin Günther <martin.guenter@holisticon.de>
 * @author Malte Sörensen <malte.soerensen@holisticon.de>
 */
public class CmmnAwareAssertions extends BpmnAwareAssertions {

  /**
   * Assert that... the given CaseInstance meets your expectations.
   *
   * @param   actual CaseInstance under test
   * @return  Assert object offering CaseInstance specific assertions.
   */
  public static CaseInstanceAssert assertThat(final CaseInstance actual) {
    return CaseInstanceAssert.assertThat(processEngine(), actual);
  }

  /**
   * Assert that... the given CaseExecution meets your expectations.
   *
   * @param   actual CaseExecution under test
   * @return  Assert object offering CaseExecution specific assertions.
   */
  public static CaseExecutionAssert assertThat(final CaseExecution actual) {
    return CaseExecutionAssert.assertThat(processEngine(), actual);
  }

  /**
   * Assert that... the given CaseDefinition meets your expectations.
   *
   * @param   actual ProcessDefinition under test
   * @return  Assert object offering ProcessDefinition specific assertions.
   */
  public static CaseDefinitionAssert assertThat(final CaseDefinition actual) {
    return CaseDefinitionAssert.assertThat(processEngine(), actual);
  }
  
  /*
   * When adding an 'assertThat' method here, also add delegate method in CmmnAwareTests!
   */

}
