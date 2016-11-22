package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;

@Data
public class Authorization {

  /**
   * enables authorization
   */
  private boolean enabled = Defaults.INSTANCE.isAuthorizationEnabled();

  /**
   * enables authorization for custom code
   */
  private boolean enabledForCustomCode = Defaults.INSTANCE.isAuthorizationEnabledForCustomCode();

  private String authorizationCheckRevokes = Defaults.INSTANCE.getAuthorizationCheckRevokes();
}
