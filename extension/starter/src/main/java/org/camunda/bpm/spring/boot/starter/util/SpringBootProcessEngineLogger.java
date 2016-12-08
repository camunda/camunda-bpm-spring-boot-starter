package org.camunda.bpm.spring.boot.starter.util;


import org.camunda.bpm.engine.identity.User;
import org.camunda.commons.logging.BaseLogger;

import java.net.URL;

public class SpringBootProcessEngineLogger extends BaseLogger {
  static final String PROJECT_CODE = "STARTER";
  static final String PROJECT_ID = "SB";
  static final String PACKAGE = "org.camunda.bpm.spring.boot";

  public static final SpringBootProcessEngineLogger LOG = createLogger(SpringBootProcessEngineLogger.class, PROJECT_CODE, PACKAGE, PROJECT_ID);

  public void creatingInitialAdminUser(User adminUser) {
    logInfo("010", "creating initital Admin User: {}", adminUser);
  }

  public void skipAdminUserCreation(User existingUser) {
    logInfo("011", "skip creating initital Admin User, user does exist: {}", existingUser);
  }

  public void skipAutoDeployment() {
    logInfo("020", "ProcessApplication enabled: autoDeployment via springConfiguration#deploymentResourcePattern is disabled");
  }

  public void enterLicenseKey(URL licenseKeyFile) {
    logInfo("030", "Setting up license key: {}", licenseKeyFile);
  }

  public void configureJobExecutorPool(Integer corePoolSize) {
    logInfo("040", "Setting up jobExecutor with pool-size {}", corePoolSize);
  }
}
