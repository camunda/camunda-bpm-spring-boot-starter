package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
public class AdditionalCammundaBpmConfigurations {

  @Bean
  public CamundaConfiguration beforeStandardConfiguration() {
    return new BeforeStandardConfiguration();
  }

  @Bean
  public CamundaConfiguration afterStandardConfiguration() {
    return new AfterStandardConfiguration();
  }

  @Order(CamundaConfiguration.DEFAULT_ORDER - 1)
  public static class BeforeStandardConfiguration implements CamundaConfiguration {

    static boolean PROCESSED = false;

    @Override
    public void apply(SpringProcessEngineConfiguration configuration) {
      assertNull(configuration.getDataSource());
      PROCESSED = true;
    }

  }

  @Order(CamundaConfiguration.DEFAULT_ORDER + 1)
  public static class AfterStandardConfiguration implements CamundaConfiguration {

    static boolean PROCESSED = false;

    @Override
    public void apply(SpringProcessEngineConfiguration configuration) {
      assertNotNull(configuration.getDataSource());
      PROCESSED = true;
    }

  }
}