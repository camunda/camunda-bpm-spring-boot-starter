package org.camunda.bpm.spring.boot.starter.property;

import java.util.Objects;

public class AuthorizationProperty {

  /**
   * enables authorization
   */
  private boolean enabled = Defaults.INSTANCE.isAuthorizationEnabled();

  /**
   * enables authorization for custom code
   */
  private boolean enabledForCustomCode = Defaults.INSTANCE.isAuthorizationEnabledForCustomCode();

  private String authorizationCheckRevokes = Defaults.INSTANCE.getAuthorizationCheckRevokes();

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public boolean isEnabledForCustomCode() {
    return enabledForCustomCode;
  }

  public void setEnabledForCustomCode(boolean enabledForCustomCode) {
    this.enabledForCustomCode = enabledForCustomCode;
  }

  public String getAuthorizationCheckRevokes() {
    return authorizationCheckRevokes;
  }

  public void setAuthorizationCheckRevokes(String authorizationCheckRevokes) {
    this.authorizationCheckRevokes = authorizationCheckRevokes;
  }

  @Override
  public String toString() {
    return "AuthorizationProperty [enabled=" + enabled + ", enabledForCustomCode="
        + enabledForCustomCode + ", authorizationCheckRevokes=" + authorizationCheckRevokes + "]";
  }

}
