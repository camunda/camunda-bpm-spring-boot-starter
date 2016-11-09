package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;

@Data
public class JobExecution {

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

}
