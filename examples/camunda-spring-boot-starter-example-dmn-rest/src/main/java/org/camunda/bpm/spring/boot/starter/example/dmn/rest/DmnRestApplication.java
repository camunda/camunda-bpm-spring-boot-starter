package org.camunda.bpm.spring.boot.starter.example.dmn.rest;

import org.camunda.bpm.engine.HistoryService;
import org.camunda.bpm.engine.history.HistoricProcessInstance;
import org.camunda.bpm.spring.boot.starter.rest.CamundaJerseyResourceConfig;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
public class DmnRestApplication {

  public static void main(final String... args) throws Exception {
    SpringApplication.run(DmnRestApplication.class, args);
  }

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Bean
  public ResourceConfig jerseyConfig() {
    return new CamundaJerseyResourceConfig();
  }

}
