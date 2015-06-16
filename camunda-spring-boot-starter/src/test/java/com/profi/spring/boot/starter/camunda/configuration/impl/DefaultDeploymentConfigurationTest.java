package com.profi.spring.boot.starter.camunda.configuration.impl;

import static org.junit.Assert.assertEquals;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.junit.Before;
import org.junit.Test;

import com.profi.spring.boot.starter.camunda.CamundaBpmProperties;

public class DefaultDeploymentConfigurationTest {

    private DefaultDeploymentConfiguration defaultDeploymentConfiguration;
    private CamundaBpmProperties camundaBpmProperties;
    private SpringProcessEngineConfiguration configuration;

    @Before
    public void before() {
        defaultDeploymentConfiguration = new DefaultDeploymentConfiguration();
        camundaBpmProperties = new CamundaBpmProperties();
        defaultDeploymentConfiguration.camundaBpmProperties = camundaBpmProperties;
        configuration = new SpringProcessEngineConfiguration();
    }

    @Test
    public void noDeploymentTest() {
        camundaBpmProperties.setAutoDeploymentEnabled(false);
        defaultDeploymentConfiguration.apply(configuration);
        assertEquals(0, configuration.getDeploymentResources().length);
    }

    @Test
    public void deploymentTest() {
        camundaBpmProperties.setAutoDeploymentEnabled(true);
        defaultDeploymentConfiguration.apply(configuration);
        assertEquals(1, configuration.getDeploymentResources().length);
    }
}
