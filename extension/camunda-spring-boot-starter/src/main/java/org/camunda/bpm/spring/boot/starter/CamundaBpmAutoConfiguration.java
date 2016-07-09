package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.AuthorizationService;
import org.camunda.bpm.engine.CaseService;
import org.camunda.bpm.engine.DecisionService;
import org.camunda.bpm.engine.ExternalTaskService;
import org.camunda.bpm.engine.FilterService;
import org.camunda.bpm.engine.FormService;
import org.camunda.bpm.engine.HistoryService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.ManagementService;
import org.camunda.bpm.engine.ProcessEngineServices;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.interceptor.CommandExecutor;
import org.camunda.bpm.engine.spring.ProcessEngineFactoryBean;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;

@EnableConfigurationProperties({ CamundaBpmProperties.class, CamundaBpmManagementProperties.class })
@Import({ CamundaBpmConfiguration.class, CamundaBpmActuatorConfiguration.class, CamundaBpmPluginsConfiguration.class })
@AutoConfigureAfter(HibernateJpaAutoConfiguration.class)
public class CamundaBpmAutoConfiguration {

  @Bean
  public ProcessEngineFactoryBean processEngineFactoryBean(final ProcessEngineConfigurationImpl processEngineConfigurationImpl) {
    final ProcessEngineFactoryBean factoryBean = new ProcessEngineFactoryBean();
    factoryBean.setProcessEngineConfiguration(processEngineConfigurationImpl);

    return factoryBean;
  }

  @Bean(name = "runtimeService")
  public RuntimeService getRuntimeService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getRuntimeService();
  }

  @Bean(name = "repositoryService")
  public RepositoryService getRepositoryService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getRepositoryService();
  }

  @Bean(name = "formService")
  public FormService getFormService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getFormService();
  }

  @Bean(name = "taskService")
  public TaskService getTaskService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getTaskService();
  }

  @Bean(name = "historyService")
  public HistoryService getHistoryService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getHistoryService();
  }

  @Bean(name = "identityService")
  public IdentityService getIdentityService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getIdentityService();
  }

  @Bean(name = "managementService")
  public ManagementService getManagementService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getManagementService();
  }

  @Bean(name = "authorizationService")
  public AuthorizationService getAuthorizationService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getAuthorizationService();
  }

  @Bean(name = "caseService")
  public CaseService getCaseService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getCaseService();
  }

  @Bean(name = "filterService")
  public FilterService getFilterService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getFilterService();
  }

  @Bean(name = "externalTaskService")
  public ExternalTaskService getExternalTaskService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getExternalTaskService();
  }

  @Bean(name = "decisionService")
  public DecisionService getDecisionService(ProcessEngineServices processEngineServices) {
    return processEngineServices.getDecisionService();
  }

  @Bean
  @Primary
  public CommandExecutor commandExecutorTxRequired(final ProcessEngineConfigurationImpl processEngineConfiguration) {
    return processEngineConfiguration.getCommandExecutorTxRequired();
  }

  @Bean
  public CommandExecutor commandExecutorTxRequiresNew(final ProcessEngineConfigurationImpl processEngineConfiguration) {
    return processEngineConfiguration.getCommandExecutorTxRequiresNew();
  }

  @Bean
  public CommandExecutor commandExecutorSchemaOperations(final ProcessEngineConfigurationImpl processEngineConfiguration) {
    return processEngineConfiguration.getCommandExecutorSchemaOperations();
  }
}
