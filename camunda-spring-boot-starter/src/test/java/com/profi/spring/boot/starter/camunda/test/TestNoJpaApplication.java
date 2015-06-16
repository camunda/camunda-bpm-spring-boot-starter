package com.profi.spring.boot.starter.camunda.test;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@EnableAutoConfiguration
@ComponentScan
@PropertySource("application-nojpa.properties")
public class TestNoJpaApplication {

}
