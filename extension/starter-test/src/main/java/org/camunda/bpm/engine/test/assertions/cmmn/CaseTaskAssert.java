package org.camunda.bpm.engine.test.assertions.cmmn;

import org.assertj.core.api.MapAssert;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cmmn.execution.CaseExecutionState;
import org.camunda.bpm.engine.runtime.CaseExecution;

import org.camunda.bpm.model.cmmn.instance.CaseTask;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public class CaseTaskAssert extends AbstractCaseAssert<CaseTaskAssert, CaseExecution> {

  protected CaseTaskAssert(final ProcessEngine engine, final CaseExecution actual) {
    super(engine, actual, CaseTaskAssert.class);
  }

  protected static CaseTaskAssert assertThat(final ProcessEngine engine, final CaseExecution actual) {
    return new CaseTaskAssert(engine, actual);
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'available'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isAvailable() {
    return super.isAvailable();
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'enabled'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isEnabled() {
    return super.isEnabled();
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'disabled'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isDisabled() {
    return super.isDisabled();
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'active'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isActive() {
    return super.isActive();
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'suspended'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isSuspended() {
    return super.isSuspended();
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'completed'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isCompleted() {
    return super.isCompleted();
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'failed'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isFailed() {
    return super.isFailed();
  }

  /**
   * Verifies the expectation that the {@link CaseTask} is in {@link CaseExecutionState} 'terminated'.
   * 
   * @return this {@link CaseTaskAssert}
   */
  @Override
  public CaseTaskAssert isTerminated() {
    return super.isTerminated();
  }

  /**
   * Verifies the expectation that the {@link org.camunda.bpm.model.cmmn.instance.CaseTask} holds no
   * case variables at all.
   *
   * @return  this {@link CaseTaskAssert}
   */
  public CaseTaskAssert hasNoVariables() {
    return (CaseTaskAssert) hasVars(null);
  }

  /**
   * Verifies the expectation that the {@link org.camunda.bpm.model.cmmn.instance.CaseTask} holds one or
   * more case variables with the specified names.
   *
   * @param   names the names of the case task variables expected to exist. In
   *          case no variable name is given, the existence of at least one
   *          variable will be verified.
   * @return  this {@link CaseTaskAssert}
   */
  public CaseTaskAssert hasVariables(final String... names) {
    return (CaseTaskAssert) hasVars(names);
  }

  /**
   * Enter into a chained map assert inspecting the variables currently available in the context of the case task instance
   * under test of this CaseTaskAssert.
   *
   * @return MapAssert<String, Object> inspecting the case task instance variables. Inspecting an empty map in case no such variables
   *         are available.
   */
  public MapAssert<String, Object> variables() {
    return super.variables();
  }

}
