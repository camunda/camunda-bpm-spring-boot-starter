package com.profi.spring.boot.starter.camunda.cockpit;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnWebApplication
@ConditionalOnProperty(prefix = "camunda.bpm.cockpit", name = "enabled", matchIfMissing = true)
public class CamundaBpmCockpitConfiguration {

    @ConditionalOnMissingBean(name = "camundaBpmCockpitInitializer")
    @Bean
    public CamundaBpmCockpitInitializer camundaBpmCockpitInitializer() {
        return new CamundaBpmCockpitInitializer();
    }
}
