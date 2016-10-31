package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.application.AbstractProcessApplication;
import org.camunda.bpm.container.impl.ContainerIntegrationLogger;
import org.camunda.bpm.container.impl.RuntimeContainerDelegateImpl;
import org.camunda.bpm.container.impl.deployment.*;
import org.camunda.bpm.container.impl.spi.DeploymentOperation;
import org.camunda.bpm.container.impl.spi.DeploymentOperationStep;
import org.camunda.bpm.container.impl.spi.ServiceTypes;
import org.camunda.bpm.engine.impl.ProcessEngineLogger;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.camunda.bpm.engine.impl.util.EnsureUtil.ensureNotNull;

public class SpringBootRuntimeContainerDelegate extends RuntimeContainerDelegateImpl {

  protected final static ContainerIntegrationLogger LOG = ProcessEngineLogger.CONTAINER_INTEGRATION_LOGGER;

  @Override
  public void deployProcessApplication(AbstractProcessApplication processApplication) {
    ensureNotNull("Process application", processApplication);

    final String operationName = "Deployment of Process Application " + processApplication.getName();

    DeploymentOperation.DeploymentOperationBuilder operationBuilder = serviceContainer.createDeploymentOperation(operationName)
      .addAttachment(Attachments.PROCESS_APPLICATION, processApplication);

    for (DeploymentOperationStep step : getDeploymentSteps()) {
      operationBuilder.addStep(step);
    }


    operationBuilder.execute();

    LOG.paDeployed(processApplication.getName());
  }


  protected List<DeploymentOperationStep> getDeploymentSteps() {
    return Arrays.asList(
      new ParseProcessesXmlStep(),
      new InitializeProcessesXmlStep(),
      new ProcessesXmlStartProcessEnginesStep(),
      new DeployProcessArchivesStep(),
      new StartProcessApplicationServiceStep(),
      new PostDeployInvocationStep());
  }

}
