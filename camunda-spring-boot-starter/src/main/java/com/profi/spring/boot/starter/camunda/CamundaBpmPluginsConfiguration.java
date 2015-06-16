package com.profi.spring.boot.starter.camunda;

import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin;
import org.camunda.spin.plugin.impl.SpinProcessEnginePlugin;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CamundaBpmPluginsConfiguration {

    @Bean
    @ConditionalOnClass(SpinProcessEnginePlugin.class)
    @ConditionalOnMissingBean(name = "spinProcessEnginePlugin")
    public static ProcessEnginePlugin spinProcessEnginePlugin() {
        return new SpinProcessEnginePlugin();
    }

    @Bean
    @ConditionalOnClass(ConnectProcessEnginePlugin.class)
    @ConditionalOnMissingBean(name = "connectProcessEnginePlugin")
    public static ProcessEnginePlugin connectProcessEnginePlugin() {
        return new ConnectProcessEnginePlugin();
    }
}
