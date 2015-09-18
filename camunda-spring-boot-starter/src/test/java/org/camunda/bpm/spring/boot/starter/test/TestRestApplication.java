package org.camunda.bpm.spring.boot.starter.test;

import org.camunda.bpm.spring.boot.starter.CamundaBpmRestConfiguration;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TestRestApplication {

  @Bean
  public ResourceConfig createRestConfig() {
    return new CamundaBpmRestConfiguration.CamundaJerseyConfig();
  }

}
