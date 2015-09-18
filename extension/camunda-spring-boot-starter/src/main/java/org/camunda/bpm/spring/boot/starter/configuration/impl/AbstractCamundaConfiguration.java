package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

@Order(CamundaConfiguration.DEFAULT_ORDER)
public abstract class AbstractCamundaConfiguration implements CamundaConfiguration {

  @Autowired
  protected CamundaBpmProperties camundaBpmProperties;

}
