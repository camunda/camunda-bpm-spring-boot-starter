package org.camunda.bpm.spring.boot.starter.example.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {RestApplication.class})
@WebAppConfiguration
@IntegrationTest({"server.port=0", "management.security.enabled:false"})
@DirtiesContext
public class CamundaBpmActuatorIT {

  private static final Logger LOGGER = LoggerFactory
    .getLogger(CamundaBpmActuatorIT.class);

  @Value("${local.server.port}")
  private int port;

  @Test
  public void jobExecutorHealthIndicatorTest() {
    final String body = getHealthBody();
    assertTrue("wrong body " + body,
      body.contains("jobExecutor\":{\"status\":\"UP\""));
  }

  @Test
  public void processEngineHealthIndicatorTest() {
    final String body = getHealthBody();
    assertTrue(
      "wrong body " + body,
      body.contains("\"processEngine\":{\"status\":\"UP\",\"name\":\"default\"}"));
  }

  private String getHealthBody() {
    ResponseEntity<String> entity = new TestRestTemplate().getForEntity(
      "http://localhost:{port}/health", String.class, port);
    final String body = entity.getBody();
    LOGGER.info("body: {}", body);
    return body;
  }
}
