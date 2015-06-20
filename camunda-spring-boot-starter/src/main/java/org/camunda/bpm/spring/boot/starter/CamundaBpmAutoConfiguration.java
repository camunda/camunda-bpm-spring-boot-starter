package org.camunda.bpm.spring.boot.starter;

import javax.annotation.PostConstruct;

import org.camunda.bpm.engine.AuthorizationService;
import org.camunda.bpm.engine.CaseService;
import org.camunda.bpm.engine.FilterService;
import org.camunda.bpm.engine.FormService;
import org.camunda.bpm.engine.HistoryService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.ManagementService;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.ProcessEngineFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

@EnableConfigurationProperties(CamundaBpmProperties.class)
@Import({ CamundaBpmConfiguration.class, CamundaBpmActuatorConfiguration.class,
        CamundaBpmRestConfiguration.class, CamundaBpmPluginsConfiguration.class })
@AutoConfigureAfter(HibernateJpaAutoConfiguration.class)
public class CamundaBpmAutoConfiguration {

    @Autowired
    private ProcessEngineConfigurationImpl processEngineConfigurationImpl;

    @Autowired
    private ProcessEngineFactoryBean processEngineFactoryBean;

    @PostConstruct
    public void init() {
        processEngineFactoryBean
                .setProcessEngineConfiguration(processEngineConfigurationImpl);
    }

    @Bean
    public static ProcessEngineFactoryBean processEngineFactoryBean() {
        return new ProcessEngineFactoryBean();
    }

    @Bean
    public RuntimeService runtimeService(ProcessEngine processEngine) {
        return processEngine.getRuntimeService();
    }

    @Bean
    public RepositoryService getRepositoryService(ProcessEngine processEngine) {
        return processEngine.getRepositoryService();
    }

    @Bean
    public FormService getFormService(ProcessEngine processEngine) {
        return processEngine.getFormService();
    }

    @Bean
    public TaskService getTaskService(ProcessEngine processEngine) {
        return processEngine.getTaskService();
    }

    @Bean
    public HistoryService getHistoryService(ProcessEngine processEngine) {
        return processEngine.getHistoryService();
    }

    @Bean
    public IdentityService getIdentityService(ProcessEngine processEngine) {
        return processEngine.getIdentityService();
    }

    @Bean
    public ManagementService getManagementService(ProcessEngine processEngine) {
        return processEngine.getManagementService();
    }

    @Bean
    public AuthorizationService getAuthorizationService(ProcessEngine processEngine) {
        return processEngine.getAuthorizationService();
    }

    @Bean
    public CaseService getCaseService(ProcessEngine processEngine) {
        return processEngine.getCaseService();
    }

    @Bean
    public FilterService getFilterService(ProcessEngine processEngine) {
        return processEngine.getFilterService();
    }

}
