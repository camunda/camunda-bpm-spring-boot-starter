package org.camunda.bpm.spring.boot.starter.example.webapp;

import org.camunda.bpm.engine.RepositoryService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { WebappExampleApplication.class })
@WebAppConfiguration
@IntegrationTest({ "server.port=0" })
public class WebappExampleApplicationIT {

  @Autowired
  private RepositoryService repositoryService;

  @Test
  public void startUpTest() {
    // context init test
  }

  @Test
  public void ensureDeployment() throws Exception {
    assertThat(repositoryService.createProcessDefinitionQuery().processDefinitionKey("Sample").singleResult())
      .as("process 'Sample' not deployed")
      .isNotNull();
  }
}
