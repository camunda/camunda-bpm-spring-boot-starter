package org.camunda.bpm.engine.test.assertions.cmmn;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.runtime.CaseExecutionQuery;
import org.camunda.bpm.engine.runtime.CaseInstance;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 * @author Malte Sörensen <malte.soerensen@holisticon.de>
 * @author Martin Günther <martin.guenther@holisticon.de>
 */
public class CaseInstanceAssert extends AbstractCaseAssert<CaseInstanceAssert, CaseInstance> {

  protected CaseInstanceAssert(final ProcessEngine engine, final CaseInstance actual) {
    super(engine, actual, CaseInstanceAssert.class);
  }

  protected static CaseInstanceAssert assertThat(final ProcessEngine engine, final CaseInstance actual) {
    return new CaseInstanceAssert(engine, actual);
  }

  @Override
  public CaseInstanceAssert isActive() {
    return super.isActive();
  }

  @Override
  public CaseInstanceAssert isCompleted() {
    return super.isCompleted();
  }

  @Override
  public CaseInstanceAssert isClosed() {
    return super.isClosed();
  }

  @Override
  public CaseInstanceAssert isTerminated() {
    return super.isTerminated();
  }

  @Override
  public CaseInstanceAssert isFailed() {
    return super.isFailed();
  }

  @Override
  public CaseInstanceAssert isSuspended() {
    return super.isSuspended();
  }

  @Override
  public HumanTaskAssert humanTask(CaseExecutionQuery query) {
    return super.humanTask(query);
  }

  @Override
  public HumanTaskAssert humanTask(String activityId) {
    return super.humanTask(activityId);
  }

  @Override
  public HumanTaskAssert humanTask() {
    return super.humanTask();
  }

  @Override
  public CaseTaskAssert caseTask(CaseExecutionQuery query) {
    return super.caseTask(query);
  }

  @Override
  public CaseTaskAssert caseTask(String activityId) {
    return super.caseTask(activityId);
  }

  @Override
  public CaseTaskAssert caseTask() {
    return super.caseTask();
  }

  @Override
  public ProcessTaskAssert processTask(CaseExecutionQuery query) {
    return super.processTask(query);
  }

  @Override
  public ProcessTaskAssert processTask(String activityId) {
    return super.processTask(activityId);
  }

  @Override
  public ProcessTaskAssert processTask() {
    return super.processTask();
  }

  @Override
  public StageAssert stage(CaseExecutionQuery query) {
    return super.stage(query);
  }

  @Override
  public StageAssert stage(String activityId) {
    return super.stage(activityId);
  }

  @Override
  public StageAssert stage() {
    return super.stage();
  }

  @Override
  public MilestoneAssert milestone(CaseExecutionQuery query) {
    return super.milestone(query);
  }

  @Override
  public MilestoneAssert milestone(String activityId) {
    return super.milestone(activityId);
  }

  @Override
  public MilestoneAssert milestone() {
    return super.milestone();
  }

  @Override
  public CaseExecutionAssert caseExecution(CaseExecutionQuery query) {
    return super.caseExecution(query.caseInstanceId(getActual().getId()));
  }

  //TODO override other caseExecution methods
}
