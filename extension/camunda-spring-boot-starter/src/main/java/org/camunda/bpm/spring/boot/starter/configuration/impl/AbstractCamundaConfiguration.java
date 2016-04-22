package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

import static org.slf4j.LoggerFactory.getLogger;

@Order(CamundaConfiguration.DEFAULT_ORDER)
public abstract class AbstractCamundaConfiguration implements CamundaConfiguration {

  /**
   * @param existing the current values (may be null or empty)
   * @param add the additional values (may be null or empty)
   * @param <T> type of elements
   * @return new non-null list containing all elements of existing and add.
   */
  public static <T> List<T> join(final List<T> existing, final List<T> add) {
    final List<T> target = new ArrayList<T>();
    if (!CollectionUtils.isEmpty(existing)) {
      target.addAll(existing);
    }
    if (!CollectionUtils.isEmpty(add)) {
      target.addAll(add);
    }
    return target;
  }

  protected final Logger logger = getLogger(this.getClass());

  @Autowired
  protected CamundaBpmProperties camundaBpmProperties;

}
