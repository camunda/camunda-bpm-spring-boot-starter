package org.camunda.bpm.engine.test.assertions.cmmn;

import org.assertj.core.api.MapAssert;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cmmn.execution.CaseExecutionState;
import org.camunda.bpm.engine.runtime.CaseExecution;
import org.camunda.bpm.model.cmmn.instance.ProcessTask;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public class ProcessTaskAssert extends AbstractCaseAssert<ProcessTaskAssert, CaseExecution> {

  protected ProcessTaskAssert(final ProcessEngine engine, final CaseExecution actual) {
    super(engine, actual, ProcessTaskAssert.class);
  }

  protected static ProcessTaskAssert assertThat(final ProcessEngine engine, final CaseExecution actual) {
    return new ProcessTaskAssert(engine, actual);
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'available'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isAvailable() {
    return super.isAvailable();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'enabled'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isEnabled() {
    return super.isEnabled();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'disabled'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isDisabled() {
    return super.isDisabled();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'active'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isActive() {
    return super.isActive();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'suspended'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isSuspended() {
    return super.isSuspended();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'completed'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isCompleted() {
    return super.isCompleted();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'failed'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isFailed() {
    return super.isFailed();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} is in {@link CaseExecutionState} 'terminated'.
   *
   * @return this {@link ProcessTaskAssert}
   */
  @Override
  public ProcessTaskAssert isTerminated() {
    return super.isTerminated();
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} holds no
   * case variables at all.
   *
   * @return  this {@link AbstractCaseAssert}
   */
  public ProcessTaskAssert hasNoVariables() {
    return (ProcessTaskAssert) hasVars(null);
  }

  /**
   * Verifies the expectation that the {@link ProcessTask} holds one or
   * more case variables with the specified names.
   *
   * @param   names the names of the human task variables expected to exist. In
   *          case no variable name is given, the existence of at least one
   *          variable will be verified.
   * @return  this {@link ProcessTaskAssert}
   */
  public ProcessTaskAssert hasVariables(final String... names) {
    return (ProcessTaskAssert) hasVars(names);
  }

  /**
   * Enter into a chained map assert inspecting the variables currently available in the context of the human task instance
   * under test of this ProcessTaskAssert.
   *
   * @return MapAssert<String, Object> inspecting the human task instance variables. Inspecting an empty map in case no such variables
   *         are available.
   */
  @Override
  public MapAssert<String, Object> variables() {
    return super.variables();
  }
}
