package org.camunda.bpm.spring.boot.starter.test;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableAutoConfiguration
@ComponentScan(excludeFilters = @ComponentScan.Filter(Configuration.class))
@EnableTransactionManagement
public class TestApplication {

}
