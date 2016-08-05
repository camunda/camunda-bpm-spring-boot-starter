package org.camunda.bpm.extension.spring.boot.rest;

import my.own.custom.spring.boot.project.SampleCamundaRestApplication;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.rest.dto.runtime.ProcessInstanceDto;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SampleCamundaRestApplication.class, webEnvironment = RANDOM_PORT)
@DirtiesContext
public class SampleCamundaRestApplicationIT {

  private final TestRestTemplate restTemplate = new TestRestTemplate();

  @Value("${local.server.port}")
  private int port;

  @Autowired
  private RuntimeService runtimeService;

  @Test
  public void restApiIsAvailable() throws Exception {
    ResponseEntity<String> entity = restTemplate.getForEntity("http://localhost:" + port + "/rest/engine/", String.class);
    assertEquals(HttpStatus.OK, entity.getStatusCode());
    assertEquals("[{\"name\":\"testEngine\"}]", entity.getBody());
  }

  @Test
  public void startProcessInstanceByCustomResource() throws Exception {
    ResponseEntity<ProcessInstanceDto> entity = restTemplate.postForEntity("http://localhost:" + port + "/rest/process/start", HttpEntity.EMPTY,
        ProcessInstanceDto.class);
    assertEquals(HttpStatus.OK, entity.getStatusCode());
    assertNotNull(entity.getBody());

    // find the process instance
    final ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(entity.getBody().getId()).singleResult();
    assertEquals(processInstance.getProcessInstanceId(), entity.getBody().getId());
  }

  @Ignore
  @Test
  public void multipartFileUploadCamundaRestIsWorking() throws Exception {
    ResponseEntity<String> entity = restTemplate.postForEntity("http://localhost:" + port + "/rest/start/process", HttpEntity.EMPTY, String.class);
    assertEquals(HttpStatus.OK, entity.getStatusCode());
    assertEquals("1", entity);

  }

}
