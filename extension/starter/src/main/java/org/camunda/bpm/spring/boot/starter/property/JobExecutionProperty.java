package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;

@Data
public class JobExecutionProperty {

  /**
   * enables job execution
   */
  private boolean enabled;

  /**
   * activate job execution
   */
  private boolean active = true;

  /**
   * if job execution is deployment aware
   */
  private boolean deploymentAware;

  private int corePoolSize = Defaults.TASK_EXECUTOR.getCorePoolSize();
  //private int maxPoolSize = Defaults.TASK_EXECUTOR.getMaxPoolSize();
  //private int keepAliveSeconds = Defaults.TASK_EXECUTOR.getKeepAliveSeconds();

}
