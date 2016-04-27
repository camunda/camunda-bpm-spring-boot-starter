package org.camunda.bpm.spring.boot.starter.example.cloud.simple;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import static org.slf4j.LoggerFactory.getLogger;

@Component
public class Showcase {

  private final Logger logger = getLogger(this.getClass());

  @Autowired
  private RuntimeService runtimeService;

  @Autowired
  private TaskService taskService;

  private String processInstanceId;

  @EventListener
  public void notify(final ContextRefreshedEvent unused) {
    processInstanceId = runtimeService.startProcessInstanceByKey("Sample").getProcessInstanceId();
    logger.info("started instance: {}", processInstanceId);

    Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
    taskService.complete(task.getId());
    logger.info("completed task: {}", task);

    // now jobExecutor should execute the async job
  }

  public String getProcessInstanceId() {
    return processInstanceId;
  }
}
