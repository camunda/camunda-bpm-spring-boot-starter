package org.camunda.bpm.spring.boot.starter.util;


import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.ProcessEngineImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public final class CamundaSpringBootUtil {

  /**
   * @param obj  that should be casted
   * @param type to cast
   * @return optional casted object
   */
  @SuppressWarnings("unchecked")
  public static <T> Optional<T> cast(final Object obj, Class<T> type) {
    return Optional.ofNullable(obj)
      .filter(type::isInstance)
      .map(type::cast);
  }

  public static SpringProcessEngineConfiguration springProcessEngineConfiguration() {
    return new SpringProcessEngineConfiguration();
  }

  public static Optional<ProcessEngineImpl> processEngineImpl(ProcessEngine processEngine) {
    return cast(processEngine, ProcessEngineImpl.class);
  }

  public static Optional<SpringProcessEngineConfiguration> springProcessEngineConfiguration(ProcessEngineConfiguration configuration) {
    return cast(configuration, SpringProcessEngineConfiguration.class);
  }

  public static SpringProcessEngineConfiguration get(ProcessEngine processEngine) {
    return (SpringProcessEngineConfiguration) processEngine.getProcessEngineConfiguration();
  }

  /**
   * @param existing the current values (may be null or empty)
   * @param add      the additional values (may be null or empty)
   * @param <T>      type of elements
   * @return new non-null list containing all elements of existing and add.
   */
  public static <T> List<T> join(final List<? extends T> existing, final List<? extends T> add) {
    final List<T> target = new ArrayList<T>();
    if (!CollectionUtils.isEmpty(existing)) {
      target.addAll(existing);
    }
    if (!CollectionUtils.isEmpty(add)) {
      target.addAll(add);
    }
    return target;
  }

  private CamundaSpringBootUtil() {
  }
}
