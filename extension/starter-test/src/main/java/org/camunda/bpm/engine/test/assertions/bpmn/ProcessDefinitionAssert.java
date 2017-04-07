package org.camunda.bpm.engine.test.assertions.bpmn;

import org.assertj.core.api.Assertions;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.history.*;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.repository.ProcessDefinitionQuery;
import org.camunda.bpm.engine.runtime.*;
import org.camunda.bpm.engine.task.TaskQuery;

/**
 * Assertions for a {@link ProcessDefinition}
 * @author Martin Schimak <martin.schimak@plexiti.com>
 * @author Rafael Cordones <rafael@cordones.me>
 */
public class ProcessDefinitionAssert extends AbstractProcessAssert<ProcessDefinitionAssert, ProcessDefinition> {

  protected ProcessDefinitionAssert(ProcessEngine engine, ProcessDefinition actual) {
    super(engine, actual, ProcessDefinitionAssert.class);
  }

  protected static ProcessDefinitionAssert assertThat(ProcessEngine engine, ProcessDefinition actual) {
    return new ProcessDefinitionAssert(engine, actual);
  }

  @Override
  protected ProcessDefinition getCurrent() {
    return processDefinitionQuery().singleResult();
  }

  @Override
  protected String toString(ProcessDefinition processDefinition) {
    return processDefinition != null ?
      String.format("%s {" +
        "id='%s', " +
        "name='%s', " +
        "description='%s', " +
        "deploymentId='%s'}",
        ProcessDefinition.class.getSimpleName(),
        processDefinition.getId(),
        processDefinition.getName(),
        processDefinition.getDescription(),
        processDefinition.getDeploymentId())
      : null;
  }

  /**
   * Verifies the expectation that the {@link ProcessDefinition} currently has the 
   * specified number of active instances, iow neither suspended nor ended instances.
   *
   * @param   number the number of expected active instances 
   * @return  this {@link ProcessDefinitionAssert}
   */
  public ProcessDefinitionAssert hasActiveInstances(final long number) {
    long instances = processInstanceQuery().active().count();
    Assertions      
      .assertThat(instances)
      .overridingErrorMessage("Expecting %s to have %s active instances, but found it to have %s.",
        getCurrent(), number, instances 
      )
      .isEqualTo(number);
    return this;
  }
  
  /* TaskQuery, automatically narrowed to actual {@link ProcessDefinition} */
  @Override
  protected TaskQuery taskQuery() {
    return super.taskQuery().processDefinitionId(actual.getId());
  }

  /* JobQuery, NOT supported, call super for unnarrowed query */
  @Override
  protected JobQuery jobQuery() {
    throw new UnsupportedOperationException();
  }

  /* ProcessInstanceQuery, automatically narrowed to actual {@link ProcessDefinition} */
  @Override
  protected ProcessInstanceQuery processInstanceQuery() {
    return super.processInstanceQuery().processDefinitionId(actual.getId());
  }

  /* ExecutionQuery, automatically narrowed to actual {@link ProcessDefinition} */
  @Override
  protected ExecutionQuery executionQuery() {
    return super.executionQuery().processDefinitionId(actual.getId());
  }

  /* VariableInstanceQuery, NOT supported, call super for unnarrowed query */
  @Override
  protected VariableInstanceQuery variableInstanceQuery() {
    throw new UnsupportedOperationException();
  }

  /* HistoricActivityInstanceQuery, automatically narrowed to actual {@link ProcessDefinition} */
  @Override
  protected HistoricActivityInstanceQuery historicActivityInstanceQuery() {
    return super.historicActivityInstanceQuery().processDefinitionId(actual.getId());
  }

  /* HistoricDetailQuery, NOT supported, call super for unnarrowed query */
  @Override
  protected HistoricDetailQuery historicDetailQuery() {
    throw new UnsupportedOperationException();
  }

  /* HistoricProcessInstanceQuery, automatically narrowed to actual {@link ProcessDefinition} */
  @Override
  protected HistoricProcessInstanceQuery historicProcessInstanceQuery() {
    return super.historicProcessInstanceQuery().processDefinitionId(actual.getId());
  }

  /* HistoricTaskInstanceQuery, automatically narrowed to actual {@link ProcessDefinition} */
  @Override
  protected HistoricTaskInstanceQuery historicTaskInstanceQuery() {
    return super.historicTaskInstanceQuery().processDefinitionId(actual.getId());
  }

  /* new HistoricVariableInstanceQuery, NOT supported, call super for unnarrowed query */
  @Override
  protected HistoricVariableInstanceQuery historicVariableInstanceQuery() {
    throw new UnsupportedOperationException();
  }

  /* ProcessDefinitionQuery, automatically narrowed to actual {@link ProcessDefinition} */
  @Override
  protected ProcessDefinitionQuery processDefinitionQuery() {
    return super.processDefinitionQuery().processDefinitionId(actual.getId());
  }
  
}
