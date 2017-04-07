package org.camunda.bpm.spring.boot.starter.configuration.id;

import org.camunda.bpm.engine.impl.cfg.IdGenerator;
import org.camunda.bpm.engine.impl.persistence.StrongUuidGenerator;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;

@SuppressWarnings("unused")
public class IdGeneratorConfiguration {

  public static final String SIMPLE = "simple";
  public static final String STRONG = "strong";
  //public static final String PREFIXED = "prefixed";

  @Bean
  @ConditionalOnMissingBean(IdGenerator.class)
  @ConditionalOnProperty(prefix = CamundaBpmProperties.PREFIX, name = "id-generator", havingValue = STRONG)
  public IdGenerator strongUuidGenerator() {
    return new StrongUuidGenerator();
  }

}
