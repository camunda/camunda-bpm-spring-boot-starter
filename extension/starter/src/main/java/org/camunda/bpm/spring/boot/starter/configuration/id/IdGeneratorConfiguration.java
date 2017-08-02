package org.camunda.bpm.spring.boot.starter.configuration.id;

import org.camunda.bpm.engine.impl.cfg.IdGenerator;
import org.camunda.bpm.engine.impl.persistence.StrongUuidGenerator;
import org.camunda.bpm.spring.boot.properties.CamundaBpmProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;

import static org.camunda.bpm.spring.boot.properties.CamundaBpmProperties.IdGeneratorType.PREFIXED;
import static org.camunda.bpm.spring.boot.properties.CamundaBpmProperties.IdGeneratorType.STRONG;

@SuppressWarnings("unused")
public class IdGeneratorConfiguration {

  public static final String PROPERTY_NAME = "id-generator";

  @Bean
  @ConditionalOnMissingBean(IdGenerator.class)
  @ConditionalOnProperty(prefix = CamundaBpmProperties.PREFIX, name = PROPERTY_NAME, havingValue = STRONG)
  public IdGenerator strongUuidGenerator() {
    return new StrongUuidGenerator();
  }


  @Bean
  @ConditionalOnMissingBean(IdGenerator.class)
  @ConditionalOnProperty(prefix = CamundaBpmProperties.PREFIX, name = PROPERTY_NAME, havingValue = PREFIXED)
  public IdGenerator prefixedUuidGenerator(@Value("${spring.application.name}") String applicationName) {
    return new PrefixedUuidGenerator(applicationName);
  }

}
