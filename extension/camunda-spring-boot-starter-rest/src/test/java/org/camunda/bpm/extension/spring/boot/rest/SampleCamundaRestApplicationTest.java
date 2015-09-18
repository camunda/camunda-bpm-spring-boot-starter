package org.camunda.bpm.extension.spring.boot.rest;

import org.camunda.bpm.engine.rest.dto.runtime.ProcessInstanceDto;
import my.own.custom.spring.boot.project.SampleCamundaRestApplication;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SampleCamundaRestApplication.class)
@WebIntegrationTest(randomPort = true)
@DirtiesContext
public class SampleCamundaRestApplicationTest {

  @Value("${local.server.port}")
  private int port;

  @Test
  public void restApiIsAvailable() throws Exception {
    ResponseEntity<String> entity = new TestRestTemplate().getForEntity(
      "http://localhost:" + port + "/rest/engine/", String.class);
    assertEquals(HttpStatus.OK, entity.getStatusCode());
    assertEquals("[{\"name\":\"default\"}]", entity.getBody());
  }

  @Test
  public void startProcessInstanceByCustomResource() throws Exception {
    ResponseEntity<ProcessInstanceDto> entity = new TestRestTemplate().postForEntity(
      "http://localhost:" + port + "/rest/process/start",
      HttpEntity.EMPTY,
      ProcessInstanceDto.class);
    assertEquals(HttpStatus.OK, entity.getStatusCode());
    assertNotNull(entity.getBody());
  }

  @Ignore
  @Test
  public void multipartFileUploadCamundaRestIsWorking() throws Exception {
    ResponseEntity<String> entity = new TestRestTemplate().postForEntity(
      "http://localhost:" + port + "/rest/start/process",
      HttpEntity.EMPTY,
      String.class);
    assertEquals(HttpStatus.OK, entity.getStatusCode());
    assertEquals("1", entity);
  }

}
