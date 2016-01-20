package org.camunda.bpm.spring.boot.starter.webapp;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("camunda.bpm.webapp")
public class CamundaBpmWebappProperties {

  private boolean indexRedirectEnabled = true;

  public boolean isIndexRedirectEnabled() {
    return indexRedirectEnabled;
  }

  public void setIndexRedirectEnabled(boolean indexRedirectEnabled) {
    this.indexRedirectEnabled = indexRedirectEnabled;
  }

}
