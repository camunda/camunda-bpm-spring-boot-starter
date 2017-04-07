package org.camunda.bpm.engine.test.assertions.cmmn;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.runtime.CaseExecution;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 * @author Malte Sörense <malte.soerensen@holisticon.de>
 */
public class MilestoneAssert extends AbstractCaseAssert<MilestoneAssert, CaseExecution> {

	protected MilestoneAssert(final ProcessEngine engine, final CaseExecution actual) {
		super(engine, actual, MilestoneAssert.class);
	}

	protected static MilestoneAssert assertThat(final ProcessEngine engine, final CaseExecution actual) {
		return new MilestoneAssert(engine, actual);
	}

  /**
   *  Verifies the expectation that the {@link CaseExecution} is 'available'.
     *
     * @return  this
    **/
	@Override
	public MilestoneAssert isAvailable() {
		return super.isAvailable();
	}

  /**
   *  Verifies the expectation that the {@link CaseExecution} is 'suspended'.
   *
   * @return  this
   **/
	@Override
	public MilestoneAssert isSuspended() {
		return super.isSuspended();
	}

  /**
   *  Verifies the expectation that the {@link CaseExecution} is 'completed'.
   *  A milestone is 'completed', when his 'occur' transition was performed.
   *
   * @return  this
   **/
	@Override
	public MilestoneAssert isCompleted() {
		return super.isCompleted();
	}

  /**
   *  Verifies the expectation that the {@link CaseExecution} is 'terminated'.
   *
   * @return  this
   **/
	@Override
	public MilestoneAssert isTerminated() {
		return super.isTerminated();
	}

}
