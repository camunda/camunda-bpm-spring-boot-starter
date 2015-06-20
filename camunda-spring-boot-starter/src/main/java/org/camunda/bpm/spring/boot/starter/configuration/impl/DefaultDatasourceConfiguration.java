package org.camunda.bpm.spring.boot.starter.configuration.impl;

import javax.sql.DataSource;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDatasourceConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.util.StringUtils;

public class DefaultDatasourceConfiguration extends AbstractCamundaConfiguration
        implements CamundaDatasourceConfiguration {

    @Autowired
    protected PlatformTransactionManager transactionManager;

    @Autowired
    protected DataSource dataSource;

    @Autowired(required = false)
    @Qualifier("camundaBpmDataSource")
    protected DataSource camundaDataSource;

    @Override
    public void apply(SpringProcessEngineConfiguration configuration) {
        configuration.setTransactionManager(transactionManager);
        if (camundaDataSource == null) {
            configuration.setDataSource(dataSource);
        } else {
            configuration.setDataSource(camundaDataSource);
        }

        configuration.setDatabaseType(camundaBpmProperties.getDatabaseType());
        configuration.setDatabaseSchemaUpdate(Boolean.toString(camundaBpmProperties
                .isSchemaUpdate()));
        if (!StringUtils.isEmpty(camundaBpmProperties.getDatabaseTablePrefix())) {
            configuration.setDatabaseTablePrefix(camundaBpmProperties
                    .getDatabaseTablePrefix());
        }
    }

}
