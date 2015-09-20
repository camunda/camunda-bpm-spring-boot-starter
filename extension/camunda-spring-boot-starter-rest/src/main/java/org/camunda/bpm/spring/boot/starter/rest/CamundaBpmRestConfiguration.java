package org.camunda.bpm.spring.boot.starter.rest;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// TODO: do we still need this configuration? or is it enough when the implementing application extends the CamundaJerseyResourceConfig?
@Configuration
@ConditionalOnWebApplication
@AutoConfigureBefore(JerseyAutoConfiguration.class)
public class CamundaBpmRestConfiguration {

  @Bean
  @ConditionalOnMissingBean(type = "org.glassfish.jersey.server.ResourceConfig")
  public ResourceConfig jerseyConfig(final CamundaJerseyResourceConfig resourceConfig) {
    return resourceConfig;
  }

}
