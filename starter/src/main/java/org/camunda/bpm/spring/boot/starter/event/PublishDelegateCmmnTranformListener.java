package org.camunda.bpm.spring.boot.starter.event;

import static org.camunda.bpm.spring.boot.starter.event.CamundaEventNames.CASE_EXECUTION_EVENTS;
import static org.camunda.bpm.spring.boot.starter.event.CamundaEventNames.TASK_EVENTS;

import org.camunda.bpm.engine.delegate.CaseExecutionListener;
import org.camunda.bpm.engine.delegate.TaskListener;
import org.camunda.bpm.engine.impl.cmmn.behavior.HumanTaskActivityBehavior;
import org.camunda.bpm.engine.impl.cmmn.model.CmmnActivity;
import org.camunda.bpm.engine.impl.cmmn.model.CmmnCaseDefinition;
import org.camunda.bpm.engine.impl.cmmn.transformer.AbstractCmmnTransformListener;
import org.camunda.bpm.engine.impl.task.TaskDefinition;
import org.camunda.bpm.model.cmmn.impl.instance.CasePlanModel;
import org.camunda.bpm.model.cmmn.instance.Case;
import org.camunda.bpm.model.cmmn.instance.CaseTask;
import org.camunda.bpm.model.cmmn.instance.DecisionTask;
import org.camunda.bpm.model.cmmn.instance.EventListener;
import org.camunda.bpm.model.cmmn.instance.HumanTask;
import org.camunda.bpm.model.cmmn.instance.Milestone;
import org.camunda.bpm.model.cmmn.instance.PlanItem;
import org.camunda.bpm.model.cmmn.instance.ProcessTask;
import org.camunda.bpm.model.cmmn.instance.Stage;
import org.camunda.bpm.model.cmmn.instance.Task;
import org.camunda.bpm.spring.boot.starter.property.EventingProperty;
import org.springframework.context.ApplicationEventPublisher;

/**
 *
 * not implemented:
 *
 * <ul>
 *   <li>transformRootElement</li>
 *   <li>transformSentry</li>
 * </ul>
 */
public class PublishDelegateCmmnTranformListener extends AbstractCmmnTransformListener {

  private final TaskListener taskListener;
  private final CaseExecutionListener executionListener;

  public PublishDelegateCmmnTranformListener(ApplicationEventPublisher publisher, final EventingProperty property) {
    if (property.isTask()) {
      this.taskListener = delegateTask -> {
        publisher.publishEvent(delegateTask);
        publisher.publishEvent(new TaskEvent(delegateTask));
      };
    } else {
      this.taskListener = null;
    }

    if (property.isExecution()) {
      this.executionListener = delegateExecution -> {
        publisher.publishEvent(delegateExecution);
        publisher.publishEvent(new CaseExecutionEvent(delegateExecution));
      };
    } else {
      this.executionListener = null;
    }
  }

  @Override
  public void transformCase(Case element, CmmnCaseDefinition caseDefinition) {
    addExecutionListener(caseDefinition);
  }


  @Override
  public void transformCasePlanModel(CasePlanModel casePlanModel, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformCasePlanModel(org.camunda.bpm.model.cmmn.instance.CasePlanModel casePlanModel, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformHumanTask(PlanItem planItem, HumanTask humanTask, CmmnActivity activity) {
    addTaskListener( ((HumanTaskActivityBehavior) activity.getActivityBehavior()).getTaskDefinition());
    addExecutionListener(activity);
  }

  @Override
  public void transformProcessTask(PlanItem planItem, ProcessTask processTask, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformCaseTask(PlanItem planItem, CaseTask caseTask, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformDecisionTask(PlanItem planItem, DecisionTask decisionTask, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformTask(PlanItem planItem, Task task, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformStage(PlanItem planItem, Stage stage, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformMilestone(PlanItem planItem, Milestone milestone, CmmnActivity activity) {
    addExecutionListener(activity);
  }

  @Override
  public void transformEventListener(PlanItem planItem, EventListener eventListener, CmmnActivity activity) {
    addExecutionListener(activity);
  }


  private void addTaskListener(TaskDefinition taskDefinition) {
    if (taskListener != null) {
      TASK_EVENTS.forEach(e -> taskDefinition.addTaskListener(e, taskListener));
    }
  }

  private void addExecutionListener(CmmnActivity activity) {
    if (executionListener != null) {
      CASE_EXECUTION_EVENTS.forEach( e -> activity.addListener(e, executionListener));
    }
  }
}
