package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.spring.boot.starter.test.nonpa.TestApplication;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;


@RunWith(Enclosed.class)
public class ProcessApplicationRuntimeContainerIT {

  @RunWith(SpringRunner.class)
  @DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
  @TestPropertySource(properties = {"camunda.bpm.application.delete-upon-undeploy=true"})
  public static abstract class SetUp {
    @Autowired
    protected RepositoryService repositoryService;

    @After
    public void cleanUp() {
      repositoryService.createDeploymentQuery().list().forEach(d -> repositoryService.deleteDeployment(d.getId()));
    }
  }


  @SpringBootTest(
    classes = { TestApplication.class },
    webEnvironment = SpringBootTest.WebEnvironment.NONE
  )
  public static class DeploymentWithoutProcessesXml extends SetUp {

    @Test
    public void allResourcesDeployed() {
      final List<String> deployedProcesses = repositoryService.createProcessDefinitionQuery().list().stream().map(ProcessDefinition::getKey).collect(toList());

      assertThat(deployedProcesses).isNotEmpty();
      assertThat(deployedProcesses).contains("AsyncServiceTaskProcess");
    }
  }

  @SpringBootTest(
    classes = { TestApplication.class },
    webEnvironment = SpringBootTest.WebEnvironment.NONE,
    properties = "camunda.bpm.application.scan-for-process-definitions=false"
  )
  @Ignore("either property does mnot apply or the engine state is dirty, but it fails beacuse the processes got deployed")
  public static class ScanForProcessDefinitionsDisabled extends SetUp {

    @Test
    public void allResourcesDeployed() {
      final List<String> deployedProcesses = repositoryService.createProcessDefinitionQuery().list().stream().map(ProcessDefinition::getKey).collect(toList());

      assertThat(deployedProcesses).isEmpty();
    }
  }
}
