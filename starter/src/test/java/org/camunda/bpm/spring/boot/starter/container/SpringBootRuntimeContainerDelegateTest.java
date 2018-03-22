package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.container.impl.deployment.DeployProcessArchivesStep;
import org.camunda.bpm.container.impl.deployment.ParseProcessesXmlStep;
import org.camunda.bpm.container.impl.deployment.PostDeployInvocationStep;
import org.camunda.bpm.container.impl.deployment.StartProcessApplicationServiceStep;
import org.camunda.bpm.container.impl.spi.DeploymentOperationStep;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.junit.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

public class SpringBootRuntimeContainerDelegateTest {

  private final InitializeProcessesXmlFromApplicationPropertiesStep step = mock(InitializeProcessesXmlFromApplicationPropertiesStep.class);
  private final SpringBootRuntimeContainerDelegate runtimeContainerDelegate = new SpringBootRuntimeContainerDelegate(step);

  @Test
  public void getDeploymentSteps() {
    final List<DeploymentOperationStep> deploymentSteps = runtimeContainerDelegate.getDeploymentSteps();

    assertThat(deploymentSteps).hasSize(5);
    assertThat(deploymentSteps.get(0)).isInstanceOf(ParseProcessesXmlStep.class);
    assertThat(deploymentSteps.get(1)).isInstanceOf(InitializeProcessesXmlFromApplicationPropertiesStep.class);
    assertThat(deploymentSteps.get(2)).isInstanceOf(DeployProcessArchivesStep.class);
    assertThat(deploymentSteps.get(3)).isInstanceOf(StartProcessApplicationServiceStep.class);
    assertThat(deploymentSteps.get(4)).isInstanceOf(PostDeployInvocationStep.class);

  }
}
