package org.camunda.bpm.spring.boot.starter.example.dmn.rest;

import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.repository.DecisionDefinition;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.Timeout;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.slf4j.LoggerFactory.getLogger;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {DmnRestApplication.class})
public class DmnRestApplicationTest {

  private final Logger logger = getLogger(this.getClass());

  @Autowired
  private RepositoryService repositoryService;

  @Test
  public void deploys_orderDiscount_dmn() {
    final DecisionDefinition definition = repositoryService.createDecisionDefinitionQuery().decisionDefinitionKey("checkOrder").singleResult();

    assertThat(definition).isNotNull();
    logger.info("definition: {}", definition.getResourceName() );
  }
}
