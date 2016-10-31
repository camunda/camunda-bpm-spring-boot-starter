package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.application.AbstractProcessApplication;
import org.camunda.bpm.application.impl.metadata.spi.ProcessesXml;
import org.camunda.bpm.container.impl.spi.DeploymentOperation;
import org.camunda.bpm.container.impl.spi.DeploymentOperationStep;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

import static org.camunda.bpm.container.impl.deployment.Attachments.PROCESSES_XML_RESOURCES;
import static org.camunda.bpm.container.impl.deployment.Attachments.PROCESS_APPLICATION;


public class InitializeProcessesXmlStep extends DeploymentOperationStep {

  public static URL getRootContext(AbstractProcessApplication processApplication) {
    URL rootLocation = processApplication.getClass()
      .getProtectionDomain()
      .getCodeSource()
      .getLocation();

    String paPackage = processApplication.getClass().getPackage().getName();

    String[] packageParts = paPackage.split("\\.");


    try {
      return new URL(rootLocation +  packageParts[0] + "/");
    } catch (MalformedURLException e) {
      throw new RuntimeException(e);
    }
  }

  private final static SpringBootProcessEngineLogger LOG = SpringBootProcessEngineLogger.INSTANCE;

  @Override
  public String getName() {
    return "Configure Process Application without processes.xml.";
  }

  @Override
  public void performOperationStep(final DeploymentOperation operationContext) {
    final AbstractProcessApplication processApplication = operationContext.getAttachment(PROCESS_APPLICATION);
    final Map<URL, ProcessesXml> parsedFiles = operationContext.getAttachment(PROCESSES_XML_RESOURCES);

    if (!parsedFiles.isEmpty()) {
      LOG.usingExistingProcessesXml();
      return;
    }

    parsedFiles.put(getRootContext(processApplication), ProcessesXml.EMPTY_PROCESSES_XML);
    LOG.usingProcessesXmlDefaultValues(parsedFiles);
  }
}
