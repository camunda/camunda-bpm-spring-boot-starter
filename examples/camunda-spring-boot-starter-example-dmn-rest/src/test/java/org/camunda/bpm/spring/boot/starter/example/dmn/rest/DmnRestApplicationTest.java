package org.camunda.bpm.spring.boot.starter.example.dmn.rest;

import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.repository.DecisionDefinition;
import org.camunda.bpm.engine.rest.dto.repository.ProcessDefinitionDto;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.Timeout;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.slf4j.LoggerFactory.getLogger;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {DmnRestApplication.class})
@WebAppConfiguration
@IntegrationTest({"server.port=0"})
@DirtiesContext
public class DmnRestApplicationTest {

  private static final String CHECK_ORDER = "checkOrder";

  @Value("${local.server.port}")
  private int port;

  @Autowired
  private CamundaBpmProperties camundaBpmProperties;

  private final Logger logger = getLogger(this.getClass());

  @Autowired
  private RepositoryService repositoryService;

  @Test
  public void deploys_orderDiscount_dmn() {
    final DecisionDefinition definition = repositoryService.createDecisionDefinitionQuery()
      .decisionDefinitionKey(CHECK_ORDER)
      .singleResult();
    assertThat(definition).isNotNull();
  }

  @Test
  public void evaluate_checkOrder() throws InterruptedException {
    String url = String.format("http://localhost:%d/rest/engine/%s/decision-definition/key/%s/evaluate",
      port,
      camundaBpmProperties.getProcessEngineName(),
      CHECK_ORDER);


    logger.info("url: {}", url);

    final ResponseEntity<String> responseEntity = new TestRestTemplate().postForEntity(url, "{\n" +
      "  \"variables\" : {\n" +
      "    \"status\" : { \"value\" : \"silver\", \"type\" : \"String\" },\n" +
      "    \"sum\" : { \"value\" : 900, \"type\" : \"Integer\" }\n" +
      "  }\n" +
      "}\n", String.class);

    logger.info(responseEntity.getBody());
  }

}
