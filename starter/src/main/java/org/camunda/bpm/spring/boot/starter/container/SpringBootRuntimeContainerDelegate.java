package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.container.impl.RuntimeContainerDelegateImpl;
import org.camunda.bpm.container.impl.deployment.DeployProcessArchivesStep;
import org.camunda.bpm.container.impl.deployment.ParseProcessesXmlStep;
import org.camunda.bpm.container.impl.deployment.PostDeployInvocationStep;
import org.camunda.bpm.container.impl.deployment.StartProcessApplicationServiceStep;
import org.camunda.bpm.container.impl.spi.DeploymentOperationStep;

import java.util.Arrays;
import java.util.List;

/**
 * Replacement for camundas default {@link RuntimeContainerDelegateImpl} that uses different {@link DeploymentOperationStep}s
 * to initialize the {@link org.camunda.bpm.application.ProcessApplication}.
 */
public class SpringBootRuntimeContainerDelegate extends RuntimeContainerDelegateImpl {

  private final InitializeProcessesXmlFromApplicationPropertiesStep initializeProcessesXmlFromApplicationPropertiesStep;

  public SpringBootRuntimeContainerDelegate(final InitializeProcessesXmlFromApplicationPropertiesStep initializeProcessesXmlFromApplicationPropertiesStep) {
    this.initializeProcessesXmlFromApplicationPropertiesStep = initializeProcessesXmlFromApplicationPropertiesStep;
  }

  protected List<DeploymentOperationStep> getDeploymentSteps() {
    return Arrays.asList(
      new ParseProcessesXmlStep(), // TODO: we might remove this to enforce ConfigurationProperties only
      initializeProcessesXmlFromApplicationPropertiesStep,
      new DeployProcessArchivesStep(),
      new StartProcessApplicationServiceStep(),
      new PostDeployInvocationStep());
  }
}

