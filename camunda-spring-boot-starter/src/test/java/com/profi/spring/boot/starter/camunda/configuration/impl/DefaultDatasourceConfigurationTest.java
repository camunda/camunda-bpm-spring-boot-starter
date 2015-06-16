package com.profi.spring.boot.starter.camunda.configuration.impl;

import static org.junit.Assert.assertSame;
import static org.mockito.Mockito.mock;

import javax.sql.DataSource;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;
import org.springframework.transaction.PlatformTransactionManager;

import com.profi.spring.boot.starter.camunda.CamundaBpmProperties;

@RunWith(MockitoJUnitRunner.class)
public class DefaultDatasourceConfigurationTest {

    @Mock
    private PlatformTransactionManager platformTransactionManager;

    private CamundaBpmProperties camundaBpmProperties;

    @InjectMocks
    private DefaultDatasourceConfiguration defaultDatasourceConfiguration;

    private SpringProcessEngineConfiguration configuration;

    @Before
    public void before() {
        configuration = new SpringProcessEngineConfiguration();
        camundaBpmProperties = new CamundaBpmProperties();
        defaultDatasourceConfiguration.camundaBpmProperties = camundaBpmProperties;
    }

    @Test
    public void transactionManagerTest() {
        defaultDatasourceConfiguration.dataSource = mock(DataSource.class);
        defaultDatasourceConfiguration.apply(configuration);
        assertSame(platformTransactionManager, configuration.getTransactionManager());
    }

    @Test
    public void defaultDataSourceTest() {
        DataSource datasourceMock = mock(DataSource.class);
        defaultDatasourceConfiguration.dataSource = datasourceMock;
        defaultDatasourceConfiguration.apply(configuration);
        assertSame(datasourceMock, getDataSourceFromConfiguration());
    }

    @Test
    public void camundaDataSourceTest() {
        DataSource camundaDatasourceMock = mock(DataSource.class);
        defaultDatasourceConfiguration.camundaDataSource = camundaDatasourceMock;
        defaultDatasourceConfiguration.dataSource = mock(DataSource.class);
        defaultDatasourceConfiguration.apply(configuration);
        assertSame(camundaDatasourceMock, getDataSourceFromConfiguration());
    }

    private DataSource getDataSourceFromConfiguration() {
        return ((TransactionAwareDataSourceProxy) configuration.getDataSource())
                .getTargetDataSource();
    }
}
