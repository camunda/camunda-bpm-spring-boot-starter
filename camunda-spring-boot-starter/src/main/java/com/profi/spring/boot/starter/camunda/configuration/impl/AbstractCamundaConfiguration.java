package com.profi.spring.boot.starter.camunda.configuration.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.profi.spring.boot.starter.camunda.CamundaBpmProperties;
import com.profi.spring.boot.starter.camunda.configuration.CamundaConfiguration;

public abstract class AbstractCamundaConfiguration implements CamundaConfiguration {

    @Autowired
    protected CamundaBpmProperties camundaBpmProperties;

    /*
     * (non-Javadoc)
     * 
     * @see
     * com.profi.spring.boot.starter.camunda.configuration.CamundaConfiguration
     * #getOrder()
     */
    @Override
    public int getOrder() {
        return CamundaConfiguration.DEFAULT_ORDER;
    }

}
