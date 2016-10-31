package org.camunda.bpm.spring.boot.starter.example.web;


import org.camunda.bpm.engine.rest.dto.repository.ProcessDefinitionDto;
import org.camunda.bpm.spring.boot.starter.example.web.CamundaBpmRestIT.RestConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { RestApplication.class, RestConfig.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CamundaBpmRestIT {

  @Autowired
  private TestRestTemplate testRestTemplate;

  @Test
  public void processDefinitionTest() {
    ResponseEntity<ProcessDefinitionDto[]> entity = testRestTemplate.getForEntity("/rest/engine/{engineName}/process-definition", ProcessDefinitionDto[].class,
        "default");
    assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(entity.getBody()).hasSize(1);
    assertThat(entity.getBody()[0].getKey()).isEqualTo("Sample");
  }

  @TestConfiguration
  protected static class RestConfig {

    @Value("${security.user.password}")
    private String password;

    @Bean
    public RestTemplateBuilder restTemplateBuilder() {
      return new RestTemplateBuilder().basicAuthorization("user", password);
    }

  }
}
