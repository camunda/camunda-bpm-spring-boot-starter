package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractCamundaConfiguration implements CamundaConfiguration {

    @Autowired
    protected CamundaBpmProperties camundaBpmProperties;

    /*
     * (non-Javadoc)
     * 
     * @see
     * org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration
     * #getOrder()
     */
    @Override
    public int getOrder() {
        return CamundaConfiguration.DEFAULT_ORDER;
    }

}
