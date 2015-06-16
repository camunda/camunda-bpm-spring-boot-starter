package com.profi.spring.boot.starter.camunda.configuration.impl;

import javax.persistence.EntityManagerFactory;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

import com.profi.spring.boot.starter.camunda.configuration.CamundaJpaConfiguration;

public class DefaultJpaConfiguration extends AbstractCamundaConfiguration implements
        CamundaJpaConfiguration {

    @Autowired(required = false)
    private EntityManagerFactory jpaEntityManagerFactory;

    @Override
    public void apply(SpringProcessEngineConfiguration configuration) {
        configuration.setJpaPersistenceUnitName(camundaBpmProperties
                .getJpaPersistenceUnitName());
        if (jpaEntityManagerFactory != null) {
            configuration.setJpaEntityManagerFactory(jpaEntityManagerFactory);
        }
        configuration.setJpaCloseEntityManager(camundaBpmProperties
                .isJpaCloseEntityManager());
        configuration.setJpaHandleTransaction(camundaBpmProperties
                .isJpaHandleTransaction());
    }
}
