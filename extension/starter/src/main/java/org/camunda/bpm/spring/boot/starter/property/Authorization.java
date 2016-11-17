package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;

import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.DEFAULTS;

@Data
public class Authorization {

  /**
   * enables authorization
   */
  private boolean enabled = DEFAULTS.isAuthorizationEnabled();

  /**
   * enables authorization for custom code
   */
  private boolean enabledForCustomCode = DEFAULTS.isAuthorizationEnabledForCustomCode();

  private String authorizationCheckRevokes = DEFAULTS.getAuthorizationCheckRevokes();
}
