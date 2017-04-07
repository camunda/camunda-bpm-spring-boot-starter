package org.camunda.bpm.engine.test.assertions.cmmn;


import org.camunda.bpm.engine.CaseService;
import org.camunda.bpm.engine.repository.CaseDefinition;
import org.camunda.bpm.engine.repository.CaseDefinitionQuery;
import org.camunda.bpm.engine.runtime.CaseExecution;
import org.camunda.bpm.engine.runtime.CaseExecutionQuery;
import org.camunda.bpm.engine.runtime.CaseInstance;
import org.camunda.bpm.engine.runtime.CaseInstanceQuery;
import org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests;

import java.util.Map;

import static java.lang.String.format;

/**
 * Convenience class to access camunda *BPMN* and *CMMN* 
 * related Assertions PLUS helper methods. Use it with a static import:
 *
 * import static org.camunda.bpm.engine.test.assertions.cmmn.CmmnAwareTests.*;
 *
 * @author Martin Schimak <martin.schimak@plexiti.com>
 * @author Martin Günther <martin.guenter@holisticon.de>
 * @author Malte Sörensen <malte.soerensen@holisticon.de>
 */
public class CmmnAwareTests extends BpmnAwareTests {

  /**
   * Assert that... the given CaseInstance meets your expectations.
   *
   * @param   actual CaseInstance under test
   * @return Assert object offering CaseInstance specific assertions.
   */
  public static CaseInstanceAssert assertThat(CaseInstance actual) {
    return CmmnAwareAssertions.assertThat(actual);
  }

  /**
   * Assert that... the given CaseExecution meets your expectations.
   *
   * @param   actual CaseExecution under test
   * @return Assert object offering CaseExecution specific assertions.
   */
  public static CaseExecutionAssert assertThat(CaseExecution actual) {
    return CmmnAwareAssertions.assertThat(actual);
  }

  /**
   * Assert that... the given CaseDefinition meets your expectations.
   *
   * @param   actual ProcessDefinition under test
   * @return Assert object offering ProcessDefinition specific assertions.
   */
  public static CaseDefinitionAssert assertThat(CaseDefinition actual) {
    return CmmnAwareAssertions.assertThat(actual);
  }

  /**
   * Helper method to easily access CaseService
   *
   * @return  CaseService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.CaseService
   */
  public static CaseService caseService() {
    return processEngine().getCaseService();
  }

  /**
   * Helper method to easily create a new CaseInstanceQuery.
   * @return new CaseInstanceQuery for process engine bound to this testing thread
   */
  public static CaseInstanceQuery caseInstanceQuery() {
    return caseService().createCaseInstanceQuery();
  }

  /**
   * Helper method to easily create a new CaseExecutionQuery.
   * @return new CaseExecutionQuery for process engine bound to this testing thread
   */
  public static CaseExecutionQuery caseExecutionQuery() {
    return caseService().createCaseExecutionQuery();
  }

  /**
   * Helper method to easily create a new CaseDefinitionQuery.
   * @return new CaseExecutionQuery for process engine bound to this testing thread
   */
  public static CaseDefinitionQuery caseDefinitionQuery() {
    return repositoryService().createCaseDefinitionQuery();
  }

  /**
   * Helper method to easily complete a CaseExecution.
   *
   * @param caseExecution the CaseExecution to complete
   */
  public static void complete(CaseExecution caseExecution) {
    if (caseExecution == null) {
      throw new IllegalArgumentException("Illegal call of complete(caseExecution) - must not be null!");
    }
    caseService().completeCaseExecution(caseExecution.getId());
  }

  /**
   * Helper method to easily disable a case execution.
   *
   * @param caseExecution
   *        the case execution to complete
   */
  public static void disable(CaseExecution caseExecution) {
    if (caseExecution == null) {
      throw new IllegalArgumentException("Illegal call of disable(caseExecution) - must not be null!");
    }
    caseService().disableCaseExecution(caseExecution.getId());
  }

  /**
   * Helper method to manually start a case execution.
   *
   * @param caseExecution
   *        the case execution to start
   */
  public static void manuallyStart(CaseExecution caseExecution) {
    if (caseExecution == null) {
      throw new IllegalArgumentException("Illegal call of manuallyStart(caseExecution) - must not be null!");
    }
    caseService().manuallyStartCaseExecution(caseExecution.getId());
  }

	/**
     * Helper method to find any {@link CaseExecution} in the context of a CaseInstance.
     * @param activityId activity to find
     * @param caseInstance CaseInstance to search in
     * @return CaseExecution or null
     */
  public static CaseExecution caseExecution(String activityId, CaseInstance caseInstance) {
    assertThat(activityId).isNotNull();
    return caseExecution(caseExecutionQuery().activityId(activityId), caseInstance);
  }

  /**
   * Helper method to find any {@link CaseExecution} in the context of a CaseInstance
   * @param caseExecutionQuery query for narrowing down on the CaseExecution to find
   * @param caseInstance CaseInstance to search in
   * @return CaseExecution or null
     */
  public static CaseExecution caseExecution(CaseExecutionQuery caseExecutionQuery, CaseInstance caseInstance) {
    return assertThat(caseInstance).isNotNull().descendantCaseExecution(caseExecutionQuery).getActual();
  }

  /**
   * Helper method to easily complete a caseExecution and pass some
   * case variables.
   *
   * @param   caseExecution CaseExecution to be completed
   * @param   variables Case variables to be passed to the
   *          case instance when completing the caseExecution. For
   *          setting those variables, you can use
   *          {@link #withVariables(String, Object, Object...)}
   */
  public static void complete(CaseExecution caseExecution, Map<String, Object> variables) {
    if (caseExecution == null || variables == null) {
      throw new IllegalArgumentException(format("Illegal call of complete(caseExecution = '%s', variables = '%s') - both must not be null!", caseExecution, variables));
    }
    caseService().withCaseExecution(caseExecution.getId()).setVariables(variables).complete();
  }

  /**
   * Helper method to easily construct a map of case variables
   *
   * @param   key (obligatory) key of first case variable
   * @param   value (obligatory) value of first case variable
   * @param   furtherKeyValuePairs (optional) key/value pairs for further
   *          case variables
   * @return  a map of case variables by passing a list of String
   *          -> Object key value pairs.
   */
  public static Map<String, Object> withVariables(final String key, final Object value, final Object... furtherKeyValuePairs) {
    return BpmnAwareTests.withVariables(key,value,furtherKeyValuePairs);
  }

}
