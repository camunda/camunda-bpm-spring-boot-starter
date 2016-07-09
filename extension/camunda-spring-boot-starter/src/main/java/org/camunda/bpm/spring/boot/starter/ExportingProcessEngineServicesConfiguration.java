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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

public class ExportingProcessEngineServicesConfiguration implements ProcessEngineServices {

  @Autowired
  private ProcessEngineServices processEngineServices;

  @Bean(name = "runtimeService")
  @Override
  public RuntimeService getRuntimeService() {
    return processEngineServices.getRuntimeService();
  }

  @Bean(name = "repositoryService")
  @Override
  public RepositoryService getRepositoryService() {
    return processEngineServices.getRepositoryService();
  }

  @Bean(name = "formService")
  @Override
  public FormService getFormService() {
    return processEngineServices.getFormService();
  }

  @Bean(name = "taskService")
  @Override
  public TaskService getTaskService() {
    return processEngineServices.getTaskService();
  }

  @Bean(name = "historyService")
  @Override
  public HistoryService getHistoryService() {
    return processEngineServices.getHistoryService();
  }

  @Bean(name = "identityService")
  @Override
  public IdentityService getIdentityService() {
    return processEngineServices.getIdentityService();
  }

  @Bean(name = "managementService")
  @Override
  public ManagementService getManagementService() {
    return processEngineServices.getManagementService();
  }

  @Bean(name = "authorizationService")
  @Override
  public AuthorizationService getAuthorizationService() {
    return processEngineServices.getAuthorizationService();
  }

  @Bean(name = "caseService")
  @Override
  public CaseService getCaseService() {
    return processEngineServices.getCaseService();
  }

  @Bean(name = "filterService")
  @Override
  public FilterService getFilterService() {
    return processEngineServices.getFilterService();
  }

  @Bean(name = "externalTaskService")
  @Override
  public ExternalTaskService getExternalTaskService() {
    return processEngineServices.getExternalTaskService();
  }

  @Bean(name = "decisionService")
  @Override
  public DecisionService getDecisionService() {
    return processEngineServices.getDecisionService();
  }
}
