package org.camunda.bpm.extension.spring.boot.rest.test;

import org.camunda.bpm.spring.boot.starter.rest.CamundaJerseyResourceConfig;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TestRestApplication {

  @Bean
  public ResourceConfig createRestConfig() {
    return new CamundaJerseyResourceConfig();
  }

}
