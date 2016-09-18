package org.camunda.bpm.spring.boot.starter.configuration.impl;

import java.util.Arrays;
import java.util.List;

import javax.sql.DataSource;

import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDatasourceConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.PlatformTransactionManager;

public class DefaultDatasourceConfiguration extends AbstractCamundaConfiguration implements CamundaDatasourceConfiguration {

  public static final List<String> SCHEMA_UPDATE_VALUES = Arrays.asList(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE,
      ProcessEngineConfiguration.DB_SCHEMA_UPDATE_FALSE, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE,
      ProcessEngineConfiguration.DB_SCHEMA_UPDATE_CREATE_DROP, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_DROP_CREATE);

  @Autowired
  protected PlatformTransactionManager transactionManager;

  @Autowired
  protected DataSource dataSource;

  @Autowired(required = false)
  @Qualifier("camundaBpmDataSource")
  protected DataSource camundaDataSource;

  @Override
  public void preInit(SpringProcessEngineConfiguration configuration) {
    configuration.setTransactionManager(transactionManager);

    if (camundaDataSource == null) {
      configuration.setDataSource(dataSource);
    } else {
      configuration.setDataSource(camundaDataSource);
    }

  }

}
