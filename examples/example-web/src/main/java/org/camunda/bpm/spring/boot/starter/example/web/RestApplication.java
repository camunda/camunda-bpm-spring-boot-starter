package org.camunda.bpm.spring.boot.starter.example.web;

import org.camunda.bpm.application.ProcessApplication;
import org.camunda.bpm.spring.boot.starter.SpringBootProcessApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@ProcessApplication
public class RestApplication extends SpringBootProcessApplication {

  public static void main(final String... args) throws Exception {
    SpringApplication.run(RestApplication.class, args);
  }

}
