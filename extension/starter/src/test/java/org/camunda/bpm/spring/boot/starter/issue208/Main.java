package org.camunda.bpm.spring.boot.starter.issue208;

import org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

/**
 * Created by Andrew Eleneski on 2/13/2017.
 */
@SpringBootApplication
@EntityScan
@EnableProcessApplication
public class Main {
  public static void main(String[] args) {
    SpringApplication.run(Main.class, args);
  }

}
