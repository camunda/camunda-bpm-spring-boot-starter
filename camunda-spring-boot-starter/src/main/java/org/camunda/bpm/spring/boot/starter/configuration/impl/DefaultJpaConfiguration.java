package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaJpaConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManagerFactory;

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
