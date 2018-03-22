package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.application.AbstractProcessApplication;
import org.camunda.bpm.application.impl.metadata.spi.ProcessesXml;
import org.camunda.bpm.container.impl.spi.DeploymentOperation;
import org.camunda.bpm.container.impl.spi.DeploymentOperationStep;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

import static org.camunda.bpm.container.impl.deployment.Attachments.PROCESSES_XML_RESOURCES;
import static org.camunda.bpm.container.impl.deployment.Attachments.PROCESS_APPLICATION;
import static org.camunda.bpm.spring.boot.starter.util.SpringBootProcessEngineLogger.LOG;


public class InitializeProcessesXmlFromApplicationPropertiesStep extends DeploymentOperationStep {

  private final CamundaBpmProperties properties;
  private final CreateProcessesXmlFromProperties createProcessesXmlFromProperties;

  public InitializeProcessesXmlFromApplicationPropertiesStep(
    final CamundaBpmProperties properties,
    final CreateProcessesXmlFromProperties createProcessesXmlFromProperties) {
    this.properties = properties;
    this.createProcessesXmlFromProperties = createProcessesXmlFromProperties;
  }

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

  @Override
  public String getName() {
    return "Configure Process Application without processes.xml.";
  }

  @Override
  public void performOperationStep(final DeploymentOperation operationContext) {
    final AbstractProcessApplication processApplication = operationContext.getAttachment(PROCESS_APPLICATION);
    final Map<URL, ProcessesXml> parsedFiles = operationContext.getAttachment(PROCESSES_XML_RESOURCES);

    if (!parsedFiles.isEmpty()) {
      LOG.runtimeContainer.usingExistingProcessesXml();
      return;
    }

    final URL rootContext = getRootContext(processApplication);
    final ProcessesXml processesXml = createProcessesXmlFromProperties.apply(processApplication, properties);
    parsedFiles.put(rootContext, processesXml);
    LOG.runtimeContainer.usingConfigurationProperties(processesXml);
  }

}
