package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;

@Data
public class Authorization {

  /**
   * enables authorization
   */
  private boolean enabled = new SpringProcessEngineConfiguration().isAuthorizationEnabled();

  /**
   * enables authorization for custom code
   */
  private boolean enabledForCustomCode = new SpringProcessEngineConfiguration().isAuthorizationEnabledForCustomCode();

  private String authorizationCheckRevokes = new SpringProcessEngineConfiguration().getAuthorizationCheckRevokes();
}
