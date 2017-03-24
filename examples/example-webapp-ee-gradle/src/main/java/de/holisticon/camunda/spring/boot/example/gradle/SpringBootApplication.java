package de.holisticon.camunda.spring.boot.example.gradle;


import org.camunda.bpm.application.ProcessApplication;
import org.springframework.boot.SpringApplication;

@org.springframework.boot.autoconfigure.SpringBootApplication
@ProcessApplication
public class SpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootApplication.class, args);
    }
}
