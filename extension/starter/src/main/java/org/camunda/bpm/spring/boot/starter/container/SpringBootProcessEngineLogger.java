package org.camunda.bpm.spring.boot.starter.container;


import org.camunda.bpm.application.impl.metadata.spi.ProcessesXml;
import org.camunda.commons.logging.BaseLogger;

import java.net.URL;
import java.util.Map;

public class SpringBootProcessEngineLogger extends BaseLogger {

  public static final String PROJECT_CODE = "SPRINGBOOT";

  public static final SpringBootProcessEngineLogger INSTANCE = BaseLogger.createLogger(
    SpringBootProcessEngineLogger.class, PROJECT_CODE, "org.camunda.bpm.spring.boot", "99");


  public void generatingProcessesXmlFromProperties() {
    logInfo("001", "Generating ProcessesXml context from application properties.");
  }

  public void usingProcessesXmlDefaultValues(Map<URL, ProcessesXml> parsed) {
    logInfo(
      "002",
      "No ProcessesXml properties found. Using default values. {}", parsed);
  }

  public void usingExistingProcessesXml() {
    logInfo(
      "003",
      "Process application already configured via processes.xml. Skipping init() step.");
  }

  public void disableAutoDeployment() {
    logInfo("004", "Using ProcessApplication: autoDeployment via springConfiguration is disabled");
  }

}
