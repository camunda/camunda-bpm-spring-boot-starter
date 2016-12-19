package org.camunda.bpm.spring.boot.starter.property;

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

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public boolean isActive() {
    return active;
  }

  public void setActive(boolean active) {
    this.active = active;
  }

  public boolean isDeploymentAware() {
    return deploymentAware;
  }

  public void setDeploymentAware(boolean deploymentAware) {
    this.deploymentAware = deploymentAware;
  }

  public int getCorePoolSize() {
    return corePoolSize;
  }

  public void setCorePoolSize(int corePoolSize) {
    this.corePoolSize = corePoolSize;
  }

  @Override
  public String toString() {
    return "JobExecutionProperty [enabled=" + enabled + ", active=" + active + ", deploymentAware="
        + deploymentAware + ", corePoolSize=" + corePoolSize + "]";
  }

}
