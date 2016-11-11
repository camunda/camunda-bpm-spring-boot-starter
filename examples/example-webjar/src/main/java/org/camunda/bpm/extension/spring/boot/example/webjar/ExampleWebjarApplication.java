package org.camunda.bpm.extension.spring.boot.example.webjar;

import org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableProcessApplication
public class ExampleWebjarApplication {

  public static void main(String[] args) {
    SpringApplication.run(ExampleWebjarApplication.class, args);
  }
}
