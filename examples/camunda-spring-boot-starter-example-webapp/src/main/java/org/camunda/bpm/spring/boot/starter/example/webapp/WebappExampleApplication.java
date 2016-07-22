package org.camunda.bpm.spring.boot.starter.example.webapp;

import org.camunda.bpm.spring.boot.processor.GenerateProcessesXml;
import org.camunda.bpm.spring.boot.starter.SpringBootProcessApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@GenerateProcessesXml
@SpringBootApplication
public class WebappExampleApplication extends SpringBootProcessApplication {

  public static  void main(String... args) {
    SpringApplication.run(WebappExampleApplication.class, args);
  }
}
