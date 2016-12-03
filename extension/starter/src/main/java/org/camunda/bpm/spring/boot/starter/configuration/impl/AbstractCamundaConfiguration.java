package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.spring.boot.starter.configuration.Ordering;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.util.SpringBootProcessEngineLogger;
import org.camunda.bpm.spring.boot.starter.util.SpringBootProcessEnginePlugin;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import static org.slf4j.LoggerFactory.getLogger;

@Order(Ordering.DEFAULT_ORDER)
public abstract class AbstractCamundaConfiguration extends SpringBootProcessEnginePlugin {

  protected static final SpringBootProcessEngineLogger LOG = SpringBootProcessEngineLogger.LOG;

  /**
   * @deprecated  use {@link SpringBootProcessEngineLogger}
   */
  @Deprecated
  protected final Logger logger = getLogger(this.getClass());

  @Autowired
  protected CamundaBpmProperties camundaBpmProperties;

}
