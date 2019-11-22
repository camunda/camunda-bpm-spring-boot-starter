package org.camunda.bpm.spring.boot.starter.event;

import org.camunda.bpm.engine.delegate.DelegateCaseExecution;

public class CaseExecutionEvent {


  protected String id;
  protected String caseInstanceId;
  protected String eventName;
  protected String caseBusinessKey;
  protected String caseDefinitionId;
  protected String parentId;
  protected String activityId;
  protected String activityName;
  protected String tenantId;
  protected String activityInstanceId;
  protected String businessKey;
  protected String currentTransitionId;
  protected String parentActivityInstanceId;
  protected String processInstanceId;

  protected boolean available;
  protected boolean active;
  protected boolean enabled;
  protected boolean disabled;
  protected boolean suspended;
  protected boolean terminated;
  protected boolean completed;
  protected boolean failed;
  protected boolean closed;


  public CaseExecutionEvent(DelegateCaseExecution execution) {
    id = execution.getId();
    caseInstanceId = execution.getCaseInstanceId();
    eventName = execution.getEventName();
    caseBusinessKey = execution.getCaseBusinessKey();
    businessKey = execution.getBusinessKey();
    caseDefinitionId = execution.getCaseDefinitionId();
    parentId = execution.getParentId();
    activityId = execution.getActivityId();
    activityName = execution.getActivityName();
    tenantId = execution.getTenantId();

    available = execution.isAvailable();
    active = execution.isActive();
    enabled = execution.isEnabled();
    disabled = execution.isDisabled();
    suspended = execution.isSuspended();
    terminated = execution.isTerminated();
    completed = execution.isCompleted();
    failed = execution.isFailed();
    closed = execution.isClosed();
  }

  public String getId() {
    return id;
  }

  public String getCaseInstanceId() {
    return caseInstanceId;
  }

  public String getEventName() {
    return eventName;
  }

  public String getCaseBusinessKey() {
    return caseBusinessKey;
  }

  public String getCaseDefinitionId() {
    return caseDefinitionId;
  }

  public String getParentId() {
    return parentId;
  }

  public String getActivityId() {
    return activityId;
  }

  public String getActivityName() {
    return activityName;
  }

  public String getTenantId() {
    return tenantId;
  }

  public String getActivityInstanceId() {
    return activityInstanceId;
  }

  public String getBusinessKey() {
    return businessKey;
  }

  public String getCurrentTransitionId() {
    return currentTransitionId;
  }

  public String getParentActivityInstanceId() {
    return parentActivityInstanceId;
  }

  public String getProcessInstanceId() {
    return processInstanceId;
  }

  public boolean isAvailable() {
    return available;
  }

  public boolean isActive() {
    return active;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public boolean isDisabled() {
    return disabled;
  }

  public boolean isSuspended() {
    return suspended;
  }

  public boolean isTerminated() {
    return terminated;
  }

  public boolean isCompleted() {
    return completed;
  }

  public boolean isFailed() {
    return failed;
  }

  public boolean isClosed() {
    return closed;
  }

  @Override
  public String toString() {
    return "CaseExecutionEvent{" +
      "id='" + id + '\'' +
      ", caseInstanceId='" + caseInstanceId + '\'' +
      ", eventName='" + eventName + '\'' +
      ", caseBusinessKey='" + caseBusinessKey + '\'' +
      ", caseDefinitionId='" + caseDefinitionId + '\'' +
      ", parentId='" + parentId + '\'' +
      ", activityId='" + activityId + '\'' +
      ", activityName='" + activityName + '\'' +
      ", tenantId='" + tenantId + '\'' +
      ", activityInstanceId='" + activityInstanceId + '\'' +
      ", businessKey='" + businessKey + '\'' +
      ", currentTransitionId='" + currentTransitionId + '\'' +
      ", parentActivityInstanceId='" + parentActivityInstanceId + '\'' +
      ", processInstanceId='" + processInstanceId + '\'' +
      ", available=" + available +
      ", active=" + active +
      ", enabled=" + enabled +
      ", disabled=" + disabled +
      ", suspended=" + suspended +
      ", terminated=" + terminated +
      ", completed=" + completed +
      ", failed=" + failed +
      ", closed=" + closed +
      '}';
  }
}
