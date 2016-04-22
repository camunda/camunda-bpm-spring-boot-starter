package org.camunda.bpm.spring.boot.starter.configuration.impl;

import javax.persistence.EntityManagerFactory;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaJpaConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

public class DefaultJpaConfiguration extends AbstractCamundaConfiguration implements CamundaJpaConfiguration {

  @Autowired(required = false)
  private EntityManagerFactory jpaEntityManagerFactory;

  @Override
  public void apply(SpringProcessEngineConfiguration configuration) {
    final CamundaBpmProperties.Jpa jpa = camundaBpmProperties.getJpa();

    configuration.setJpaPersistenceUnitName(jpa.getPersistenceUnitName());
    if (jpaEntityManagerFactory != null) {
      configuration.setJpaEntityManagerFactory(jpaEntityManagerFactory);
    }
    configuration.setJpaCloseEntityManager(jpa.isCloseEntityManager());
    configuration.setJpaHandleTransaction(jpa.isHandleTransaction());
  }
}
