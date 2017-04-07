package org.camunda.bpm.engine.test.assertions.bpmn;


import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.repository.ProcessDefinitionQuery;
import org.camunda.bpm.engine.runtime.*;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.task.TaskQuery;

import java.util.HashMap;
import java.util.Map;

import static java.lang.String.format;

/**
 * Convenience class to access only camunda *BPMN* related Assertions 
 * PLUS helper methods. Usage is possible, if you only need BPMN Tests and 
 * mandatory if you still use Camunda BPM <= 7.1. 
 * 
 * Use it with a static import:
 *
 * import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.*;
 *
 * @see org.camunda.bpm.engine.test.assertions.ProcessEngineTests 
 *      for full Camunda BPM Assertions functionality  
 *
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public class BpmnAwareTests extends BpmnAwareAssertions {

  protected BpmnAwareTests() {}

  /**
   * Helper method to easily access RuntimeService
   *
   * @return  RuntimeService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.RuntimeService
   */
  public static RuntimeService runtimeService() {
    return processEngine().getRuntimeService();
  }

  /**
   * Helper method to easily access AuthorizationService
   *
   * @return  AuthorizationService of process engine bound to this 
   *          testing thread
   * @see     org.camunda.bpm.engine.AuthorizationService
   */
  public static AuthorizationService authorizationService() {
    return processEngine().getAuthorizationService();
  }

  /**
   * Helper method to easily access FormService
   *
   * @return  FormService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.FormService
   */
  public static FormService formService() {
    return processEngine().getFormService();
  }

  /**
   * Helper method to easily access HistoryService
   *
   * @return  HistoryService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.HistoryService
   */
  public static HistoryService historyService() {
    return processEngine().getHistoryService();
  }

  /**
   * Helper method to easily access IdentityService
   *
   * @return  IdentityService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.IdentityService
   */
  public static IdentityService identityService() {
    return processEngine().getIdentityService();
  }

  /**
   * Helper method to easily access ManagementService
   *
   * @return  ManagementService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.ManagementService
   */
  public static ManagementService managementService() {
    return processEngine().getManagementService();
  }

  /**
   * Helper method to easily access RepositoryService
   *
   * @return  RepositoryService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.RepositoryService
   */
  public static RepositoryService repositoryService() {
    return processEngine().getRepositoryService();
  }

  /**
   * Helper method to easily access TaskService
   *
   * @return  TaskService of process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.TaskService
   */
  public static TaskService taskService() {
    return processEngine().getTaskService();
  }

  /**
   * Helper method to easily create a new TaskQuery
   *
   * @return  new TaskQuery for process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.task.TaskQuery
   */
  public static TaskQuery taskQuery() {
    return taskService().createTaskQuery();
  }

  /**
   * Helper method to easily create a new JobQuery
   *
   * @return  new JobQuery for process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.runtime.JobQuery
   */
  public static JobQuery jobQuery() {
    return managementService().createJobQuery();
  }

  /**
   * Helper method to easily create a new ProcessInstanceQuery
   *
   * @return  new ProcessInstanceQuery for process engine bound to this 
   *          testing thread
   * @see     org.camunda.bpm.engine.runtime.ProcessInstanceQuery
   */
  public static ProcessInstanceQuery processInstanceQuery() {
    return runtimeService().createProcessInstanceQuery();
  }

  /**
   * Helper method to easily create a new ProcessDefinitionQuery
   *
   * @return  new ProcessDefinitionQuery for process engine bound to this 
   *          testing thread
   * @see     org.camunda.bpm.engine.repository.ProcessDefinitionQuery
   */
  public static ProcessDefinitionQuery processDefinitionQuery() {
    return repositoryService().createProcessDefinitionQuery();
  }

  /**
   * Helper method to easily create a new ExecutionQuery
   *
   * @return  new ExecutionQuery for process engine bound to this testing thread
   * @see     org.camunda.bpm.engine.runtime.ExecutionQuery
   */
  public static ExecutionQuery executionQuery() {
    return runtimeService().createExecutionQuery();
  }

  /**
   * Helper method to easily construct a map of process variables
   *
   * @param   key (obligatory) key of first process variable
   * @param   value (obligatory) value of first process variable
   * @param   furtherKeyValuePairs (optional) key/value pairs for further 
   *          process variables
   * @return  a map of process variables by passing a list of String 
   *          -> Object key value pairs.
   */
  public static Map<String, Object> withVariables(final String key, final Object value, final Object... furtherKeyValuePairs) {
    if (key == null)
      throw new IllegalArgumentException(format("Illegal call of withVariables(key = '%s', value = '%s', ...) - key must not be null!", key, value));
    final Map<String, Object> map = new HashMap<String, Object>();
    map.put(key, value);
    if (furtherKeyValuePairs != null) {
      if (furtherKeyValuePairs.length % 2 != 0) {
        throw new IllegalArgumentException(format("Illegal call of withVariables() - must have an even number of arguments, but found length = %s!", furtherKeyValuePairs.length + 2));
      }
      for (int i = 0; i < furtherKeyValuePairs.length; i += 2) {
        if (!(furtherKeyValuePairs[i] instanceof String))
          throw new IllegalArgumentException(format("Illegal call of withVariables() - keys must be strings, found object of type '%s'!", furtherKeyValuePairs[i] != null ? furtherKeyValuePairs[i].getClass().getName() : null));
        map.put((String) furtherKeyValuePairs[i], furtherKeyValuePairs[i + 1]);
      }
    }
    return map;
  }

  /**
   * Helper method to easily access the only task currently
   * available in the context of the last asserted process
   * instance.
   *
   * @return  the only task of the last asserted process
   *          instance. May return null if no such task exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one task is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static Task task() {
    return task(taskQuery());
  }

  /**
   * Helper method to easily access the only task currently 
   * available in the context of the given process instance.
   *
   * @param   processInstance the process instance for which
   *          a task should be retrieved.
   * @return  the only task of the process instance. May 
   *          return null if no such task exists.
   * @throws  java.lang.IllegalStateException in case more 
   *          than one task is delivered by the underlying 
   *          query.
   */
  public static Task task(ProcessInstance processInstance) {
    return task(taskQuery(), processInstance);
  }

  /**
   * Helper method to easily access the only task with the 
   * given taskDefinitionKey currently available in the context 
   * of the last asserted process instance.
   *
   * @param   taskDefinitionKey the key of the task that should
   *          be retrieved.                             
   * @return  the only task of the last asserted process
   *          instance. May return null if no such task exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one task is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static Task task(String taskDefinitionKey) {
    assertThat(taskDefinitionKey).isNotNull();
    return task(taskQuery().taskDefinitionKey(taskDefinitionKey));
  }

  /**
   * Helper method to easily access the only task with the 
   * given taskDefinitionKey currently available in the context 
   * of the given process instance.
   *
   * @param   taskDefinitionKey the key of the task that should
   *          be retrieved.                             
   * @param   processInstance the process instance for which
   *          a task should be retrieved.
   * @return  the only task of the given process instance. May
   *          return null if no such task exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one task is delivered by the underlying 
   *          query.
   */
  public static Task task(String taskDefinitionKey, ProcessInstance processInstance) {
    assertThat(taskDefinitionKey).isNotNull();
    return task(taskQuery().taskDefinitionKey(taskDefinitionKey), processInstance);
  }

  /**
   * Helper method to easily access the only task compliant to 
   * a given taskQuery and currently available in the context 
   * of the last asserted process instance.
   *
   * @param   taskQuery the query with which the task should
   *          be retrieved. This query will be further narrowed
   *          to the last asserted process instance.
   * @return  the only task of the last asserted process instance 
   *          and compliant to the given query. May return null 
   *          in case no such task exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one task is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static Task task(TaskQuery taskQuery) {
    ProcessInstanceAssert lastAssert = AbstractProcessAssert.getLastAssert(ProcessInstanceAssert.class);
    if (lastAssert == null)
      throw new IllegalStateException(
        "Call a process instance assertion first - " +
          "e.g. assertThat(processInstance)... !"
      );
    return task(taskQuery, lastAssert.getActual());
  }

  /**
   * Helper method to easily access the only task compliant to 
   * a given taskQuery and currently available in the context 
   * of the given process instance.
   *
   * @param   taskQuery the query with which the task should
   *          be retrieved. This query will be further narrowed
   *          to the given process instance.
   * @param   processInstance the process instance for which
   *          a task should be retrieved.
   * @return  the only task of the given process instance and 
   *          compliant to the given query. May return null in 
   *          case no such task exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one task is delivered by the underlying 
   *          query.
   */
  public static Task task(TaskQuery taskQuery, ProcessInstance processInstance) {
    return assertThat(processInstance).isNotNull().task(taskQuery).getActual();
  }

  /**
   * Helper method to easily access the process definition 
   * on which the last asserted process instance is based.
   *
   * @return  the process definition on which the last 
   *          asserted process instance is based.
   * @throws  java.lang.IllegalStateException in case no 
   *          process instance was asserted yet.
   */
  public static ProcessDefinition processDefinition() {
    ProcessInstanceAssert lastAssert = AbstractProcessAssert.getLastAssert(ProcessInstanceAssert.class);
    if (lastAssert == null)
      throw new IllegalStateException(
        "Call a process instance assertion first - " +
          "e.g. assertThat(processInstance)... !"
      );
    return processDefinition(lastAssert.getActual());
  }

  /**
   * Helper method to easily access the process definition 
   * on which the given process instance is based.
   *
   * @param   processInstance the process instance for which
   *          the definition should be retrieved.
   * @return  the process definition on which the given 
   *          process instance is based.
   */
  public static ProcessDefinition processDefinition(ProcessInstance processInstance) {
    assertThat(processInstance).isNotNull();
    return processDefinition(processDefinitionQuery().processDefinitionId(processInstance.getProcessDefinitionId()));
  }

  /**
   * Helper method to easily access the process definition with the 
   * given processDefinitionKey.
   *
   * @param   processDefinitionKey the key of the process definition 
   *          that should be retrieved.                             
   * @return  the process definition with the given key. 
   *          May return null if no such process definition exists.
   */
  public static ProcessDefinition processDefinition(String processDefinitionKey) {
    assertThat(processDefinitionKey).isNotNull();
    return processDefinition(processDefinitionQuery().processDefinitionKey(processDefinitionKey));
  }

  /**
   * Helper method to easily access the process definition compliant 
   * to a given process definition query.
   *
   * @param   processDefinitionQuery the query with which the process 
   *          definition should be retrieved.
   * @return  the process definition compliant to the given query. May 
   *          return null in case no such process definition exists.
   * @throws  org.camunda.bpm.engine.ProcessEngineException in case more 
   *          than one process definition is delivered by the underlying 
   *          query.
   */
  public static ProcessDefinition processDefinition(ProcessDefinitionQuery processDefinitionQuery) {
    return processDefinitionQuery.singleResult();
  }

  /**
   * Helper method to easily access the only called process instance 
   * currently available in the context of the last asserted process
   * instance.
   *
   * @return  the only called process instance called by the last asserted process
   *          instance. May return null if no such process instance exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one process instance is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static ProcessInstance calledProcessInstance() {
    return calledProcessInstance(processInstanceQuery());
  }

  /**
   * Helper method to easily access the only called process instance 
   * currently available in the context of the given process instance.
   *
   * @param   processInstance the process instance for which
   *          a called process instance should be retrieved.
   * @return  the only called process instance called by the given process 
   *          instance. May return null if no such process instance exists.
   * @throws  java.lang.IllegalStateException in case more 
   *          than one process instance is delivered by the underlying 
   *          query.
   */
  public static ProcessInstance calledProcessInstance(ProcessInstance processInstance) {
    return calledProcessInstance(processInstanceQuery(), processInstance);
  }

  /**
   * Helper method to easily access the only called process instance with 
   * the given processDefinitionKey currently available in the context 
   * of the last asserted process instance.
   *
   * @param   processDefinitionKey the key of the process instance that should
   *          be retrieved.                             
   * @return  the only such process instance called by the last asserted process
   *          instance. May return null if no such process instance exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one process instance is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static ProcessInstance calledProcessInstance(String processDefinitionKey) {
    assertThat(processDefinitionKey).isNotNull();
    return calledProcessInstance(processInstanceQuery().processDefinitionKey(processDefinitionKey));
  }

  /**
   * Helper method to easily access the only called process instance with the 
   * given processDefinitionKey currently available in the context 
   * of the given process instance.
   *
   * @param   processDefinitionKey the key of the process instance that should
   *          be retrieved.                             
   * @param   processInstance the process instance for which
   *          a called process instance should be retrieved.
   * @return  the only such process instance called by the given process instance. 
   *          May return null if no such process instance exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one process instance is delivered by the underlying 
   *          query.
   */
  public static ProcessInstance calledProcessInstance(String processDefinitionKey, ProcessInstance processInstance) {
    assertThat(processDefinitionKey).isNotNull();
    return calledProcessInstance(processInstanceQuery().processDefinitionKey(processDefinitionKey), processInstance);
  }

  /**
   * Helper method to easily access the only called process instance compliant to 
   * a given processInstanceQuery and currently available in the context 
   * of the last asserted process instance.
   *
   * @param   processInstanceQuery the query with which the called process instance should
   *          be retrieved. This query will be further narrowed to the last asserted 
   *          process instance.
   * @return  the only such process instance called by the last asserted process instance and 
   *          compliant to the given query. May return null in case no such task exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one process instance is delivered by the underlying query or in case no 
   *          process instance was asserted yet.
   */
  public static ProcessInstance calledProcessInstance(ProcessInstanceQuery processInstanceQuery) {
    ProcessInstanceAssert lastAssert = AbstractProcessAssert.getLastAssert(ProcessInstanceAssert.class);
    if (lastAssert == null)
      throw new IllegalStateException(
        "Call a process instance assertion first - " +
          "e.g. assertThat(processInstance)... !"
      );
    return calledProcessInstance(processInstanceQuery, lastAssert.getActual());
  }

  /**
   * Helper method to easily access the only called process instance compliant to 
   * a given processInstanceQuery and currently available in the context of the given 
   * process instance.
   *
   * @param   processInstanceQuery the query with which the process instance should
   *          be retrieved. This query will be further narrowed to the given process 
   *          instance.
   * @param   processInstance the process instance for which
   *          a called process instance should be retrieved.
   * @return  the only such process instance called by the given process instance and 
   *          compliant to the given query. May return null in 
   *          case no such process instance exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one instance is delivered by the underlying 
   *          query.
   */
  public static ProcessInstance calledProcessInstance(ProcessInstanceQuery processInstanceQuery, ProcessInstance processInstance) {
    return assertThat(processInstance).isNotNull().calledProcessInstance(processInstanceQuery).getActual();
  }

  /**
   * Helper method to easily access the only job currently
   * available in the context of the last asserted process
   * instance.
   *
   * @return  the only job of the last asserted process
   *          instance. May return null if no such job exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one job is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static Job job() {
    return job(jobQuery());
  }

  /**
   * Helper method to easily access the only job currently 
   * available in the context of the given process instance.
   *
   * @param   processInstance the process instance for which
   *          a job should be retrieved.
   * @return  the only job of the process instance. May 
   *          return null if no such task exists.
   * @throws  java.lang.IllegalStateException in case more 
   *          than one job is delivered by the underlying 
   *          query.
   */
  public static Job job(ProcessInstance processInstance) {
    return job(jobQuery(), processInstance);
  }

  /**
   * Helper method to easily access the only job with the 
   * given activityId currently available in the context 
   * of the last asserted process instance.
   *
   * @param   activityId the id of the job that should
   *          be retrieved.                             
   * @return  the only job of the last asserted process
   *          instance. May return null if no such job exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one job is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static Job job(String activityId) {
    ProcessInstanceAssert lastAssert = AbstractProcessAssert.getLastAssert(ProcessInstanceAssert.class);
    if (lastAssert == null)
      throw new IllegalStateException(
        "Call a process instance assertion first - " +
          "e.g. assertThat(processInstance)... !"
      );
    return job(activityId, lastAssert.getActual());
  }

  /**
   * Helper method to easily access the only job with the 
   * given activityId currently available in the context 
   * of the given process instance.
   *
   * @param   activityId the activityId of the job that should
   *          be retrieved.                             
   * @param   processInstance the process instance for which
   *          a job should be retrieved.
   * @return  the only job of the given process instance. May
   *          return null if no such job exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one job is delivered by the underlying 
   *          query.
   */
  public static Job job(String activityId, ProcessInstance processInstance) {
    return assertThat(processInstance).isNotNull().job(activityId).getActual();
  }

  /**
   * Helper method to easily access the only job compliant to 
   * a given jobQuery and currently available in the context 
   * of the last asserted process instance.
   *
   * @param   jobQuery the query with which the job should
   *          be retrieved. This query will be further narrowed
   *          to the last asserted process instance.
   * @return  the only job of the last asserted process instance 
   *          and compliant to the given query. May return null 
   *          in case no such task exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one job is delivered by the underlying 
   *          query or in case no process instance was asserted 
   *          yet.
   */
  public static Job job(JobQuery jobQuery) {
    ProcessInstanceAssert lastAssert = AbstractProcessAssert.getLastAssert(ProcessInstanceAssert.class);
    if (lastAssert == null)
      throw new IllegalStateException(
        "Call a process instance assertion first - " +
          "e.g. assertThat(processInstance)... !"
      );
    return job(jobQuery, lastAssert.getActual());
  }

  /**
   * Helper method to easily access the only job compliant to 
   * a given jobQuery and currently available in the context 
   * of the given process instance.
   *
   * @param   jobQuery the query with which the job should
   *          be retrieved. This query will be further narrowed
   *          to the given process instance.
   * @param   processInstance the process instance for which
   *          a job should be retrieved.
   * @return  the only job of the given process instance and 
   *          compliant to the given query. May return null in 
   *          case no such job exists.
   * @throws  java.lang.IllegalStateException in case more
   *          than one job is delivered by the underlying 
   *          query.
   */
  public static Job job(JobQuery jobQuery, ProcessInstance processInstance) {
    return assertThat(processInstance).isNotNull().job(jobQuery).getActual();
  }

  /**
   * Helper method to easily claim a task for a specific 
   * assignee.
   *
   * @param   task Task to be claimed for an assignee
   * @param   assigneeUserId userId of assignee for which 
   *          the task should be claimed
   * @return  the assigned task - properly refreshed to its 
   *          assigned state.
   */
  public static Task claim(Task task, String assigneeUserId) {
    if (task == null || assigneeUserId == null)
      throw new IllegalArgumentException(format("Illegal call " +
        "of claim(task = '%s', assigneeUserId = '%s') - both must " +
        "not be null!", task, assigneeUserId));
    taskService().claim(task.getId(), assigneeUserId);
    return taskQuery().taskId(task.getId()).singleResult();
  }

  /**
   * Helper method to easily unclaim a task.
   *
   * @param   task Task to be claimed for an assignee
   * @return  the assigned task - properly refreshed to its 
   *          unassigned state.
   */
  public static Task unclaim(Task task) {
    if (task == null)
      throw new IllegalArgumentException(format("Illegal call " +
        "of unclaim(task = '%s') - task must " +
        "not be null!", task));
    taskService().claim(task.getId(), null);
    return taskQuery().taskId(task.getId()).singleResult();
  }

  /**
   * Helper method to easily complete a task and pass some 
   * process variables. 
   *
   * @param   task Task to be completed 
   * @param   variables Process variables to be passed to the 
   *          process instance when completing the task. For 
   *          setting those variables, you can use 
   *          withVariables(String key, Object value, ...)
   */
  public static void complete(Task task, Map<String, Object> variables) {
    if (task == null || variables == null)
      throw new IllegalArgumentException(format("Illegal call of claim(task = '%s', variables = '%s') - both must not be null!", task, variables));
    taskService().complete(task.getId(), variables);
  }

  /**
   * Helper method to easily complete a task.
   *
   * @param   task Task to be completed 
   */
  public static void complete(Task task) {
    if (task == null)
      throw new IllegalArgumentException(format("Illegal call of claim(task = '%s') - must not be null!", task));
    taskService().complete(task.getId());
  }

  /**
   * Helper method to easily execute a job.
   *
   * @param   job Job to be executed.
   */
  public static void execute(Job job) {
    if (job == null)
      throw new IllegalArgumentException(format("Illegal call of execute(job = '%s') - must not be null!", job));
    Job current = jobQuery().jobId(job.getId()).singleResult();
    if (current == null)
      throw new IllegalStateException(format("Illegal state when calling execute(job = '%s') - job does not exist anymore!", job));
    managementService().executeJob(job.getId());
  }

}
