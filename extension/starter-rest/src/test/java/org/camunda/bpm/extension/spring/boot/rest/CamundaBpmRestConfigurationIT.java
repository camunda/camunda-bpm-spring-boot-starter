package org.camunda.bpm.extension.spring.boot.rest;

import static org.junit.Assert.assertEquals;

import org.camunda.bpm.engine.rest.dto.repository.ProcessDefinitionDto;
import org.camunda.bpm.extension.spring.boot.rest.test.TestRestApplication;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TestRestApplication.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext
public class CamundaBpmRestConfigurationIT {

  @Value("${local.server.port}")
  private int port;

  @Value("${security.user.password}")
  private String password;

  @Autowired
  private CamundaBpmProperties camundaBpmProperties;

  @Test
  public void processDefinitionTest() {
    // start process
    new TestRestTemplate().postForEntity("http://localhost:" + port + "/rest/start/process", HttpEntity.EMPTY, String.class);

    ResponseEntity<ProcessDefinitionDto> entity = new TestRestTemplate().getForEntity(
        "http://localhost:{port}/rest/engine/{engineName}/process-definition/key/TestProcess/", ProcessDefinitionDto.class, port,
        camundaBpmProperties.getProcessEngineName());

    assertEquals(HttpStatus.OK, entity.getStatusCode());
    assertEquals("TestProcess", entity.getBody().getKey());
  }
}
