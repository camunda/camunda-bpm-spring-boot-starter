package com.profi.spring.boot.starter.camunda;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

import com.profi.spring.boot.starter.camunda.configuration.CamundaConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.CamundaConfigurationComparator;
import com.profi.spring.boot.starter.camunda.configuration.CamundaDatasourceConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.CamundaDeploymentConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.CamundaHistoryConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.CamundaJobConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.CamundaJpaConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.CamundaProcessEngineConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.impl.DefaultDatasourceConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.impl.DefaultDeploymentConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.impl.DefaultHistoryConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.impl.DefaultJobConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.impl.DefaultJobConfiguration.JobConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.impl.DefaultJpaConfiguration;
import com.profi.spring.boot.starter.camunda.configuration.impl.DefaultProcessEngineConfiguration;

@Import(JobConfiguration.class)
public class CamundaBpmConfiguration {

    private static final Logger LOGGER = LoggerFactory
            .getLogger(CamundaBpmConfiguration.class);

    protected List<CamundaConfiguration> camundaConfigurationsOrdered = new ArrayList<>();

    @Autowired
    public void setCamundaConfigurations(
            Collection<CamundaConfiguration> camundaConfigurations) {
        camundaConfigurationsOrdered.addAll(camundaConfigurations);
        Collections.sort(camundaConfigurationsOrdered,
                new CamundaConfigurationComparator());
    }

    @Bean
    @ConditionalOnMissingBean(ProcessEngineConfigurationImpl.class)
    public ProcessEngineConfigurationImpl processEngineConfigurationImpl() {
        SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();

        for (CamundaConfiguration camundaConfiguration : camundaConfigurationsOrdered) {
            LOGGER.debug("applying {}", camundaConfiguration.getClass());
            camundaConfiguration.apply(configuration);
        }

        return configuration;
    }

    @Bean
    @ConditionalOnMissingBean(CamundaProcessEngineConfiguration.class)
    public static CamundaProcessEngineConfiguration camundaProcessEngineConfiguration() {
        return new DefaultProcessEngineConfiguration();
    }

    @Bean
    @ConditionalOnMissingBean(CamundaDatasourceConfiguration.class)
    public static CamundaDatasourceConfiguration camundaDatasourceConfiguration() {
        return new DefaultDatasourceConfiguration();
    }

    @Bean
    @ConditionalOnBean(name = "entityManagerFactory")
    @ConditionalOnMissingBean(CamundaJpaConfiguration.class)
    @ConditionalOnProperty(prefix = "camunda.bpm", name = "jpaEnabled", havingValue = "true", matchIfMissing = true)
    public static CamundaJpaConfiguration camundaJpaConfiguration() {
        return new DefaultJpaConfiguration();
    }

    @Bean
    @ConditionalOnMissingBean(CamundaJobConfiguration.class)
    @ConditionalOnProperty(prefix = "camunda.bpm", name = "jobExecutionEnabled", havingValue = "true", matchIfMissing = true)
    public static CamundaJobConfiguration camundaJobConfiguration() {
        return new DefaultJobConfiguration();
    }

    @Bean
    @ConditionalOnMissingBean(CamundaHistoryConfiguration.class)
    public static CamundaHistoryConfiguration camundaHistoryConfiguration() {
        return new DefaultHistoryConfiguration();
    }

    @Bean
    @ConditionalOnMissingBean(CamundaDeploymentConfiguration.class)
    public static CamundaDeploymentConfiguration camundaDeploymentConfiguration() {
        return new DefaultDeploymentConfiguration();
    }
}
