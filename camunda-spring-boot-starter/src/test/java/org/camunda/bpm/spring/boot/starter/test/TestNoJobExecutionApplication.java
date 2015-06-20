package org.camunda.bpm.spring.boot.starter.test;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@EnableAutoConfiguration
@ComponentScan
@PropertySource("application-nojobexecution.properties")
public class TestNoJobExecutionApplication {

}
