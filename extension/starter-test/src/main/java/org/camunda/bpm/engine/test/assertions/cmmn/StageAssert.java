package org.camunda.bpm.engine.test.assertions.cmmn;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.history.HistoricCaseActivityInstanceQuery;
import org.camunda.bpm.engine.impl.cmmn.execution.CaseExecutionState;
import org.camunda.bpm.engine.runtime.CaseExecution;
import org.camunda.bpm.engine.runtime.CaseExecutionQuery;
import org.camunda.bpm.engine.runtime.CaseInstance;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public class StageAssert extends AbstractCaseAssert<StageAssert, CaseExecution> {

	protected StageAssert(final ProcessEngine engine, final CaseExecution actual) {
		super(engine, actual, StageAssert.class);
	}

	protected static StageAssert assertThat(final ProcessEngine engine, final CaseExecution actual) {
		return new StageAssert(engine, actual);
	}

	@Override
	public StageAssert isAvailable() {
		return super.isAvailable();
	}

	@Override
	public StageAssert isEnabled() {
		return super.isEnabled();
	}

	@Override
	public StageAssert isDisabled() {
		return super.isDisabled();
	}

	@Override
	public StageAssert isActive() {
		return super.isActive();
	}

	@Override
	public StageAssert isSuspended() {
		return super.isSuspended();
	}

	@Override
	public StageAssert isCompleted() {
		return super.isCompleted();
	}

	@Override
	public StageAssert isFailed() {
		return super.isFailed();
	}

	@Override
	public StageAssert isTerminated() {
		return super.isTerminated();
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

}
