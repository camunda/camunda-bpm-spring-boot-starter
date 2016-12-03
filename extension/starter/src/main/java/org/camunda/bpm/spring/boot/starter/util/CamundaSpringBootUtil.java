package org.camunda.bpm.spring.boot.starter.util;


import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.ProcessEngineImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public final class CamundaSpringBootUtil {

  /**
   * @param obj  that should be casted
   * @param type to cast
   * @return optional casted object
   */
  @SuppressWarnings("unchecked")
  public static <T> Optional<T> cast(Object obj, Class<T> type) {
    if (type.isInstance(obj)) {
      return Optional.of((T) obj);
    }
    return Optional.empty();
  }

  public static SpringProcessEngineConfiguration springProcessEngineConfiguration() {
    final SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();
    return init(configuration);
  }

  /**
   * Initializes empty collections.
   *
   * @param configuration the configuration to modify
   * @return the configuration
   */
  public static SpringProcessEngineConfiguration init(SpringProcessEngineConfiguration configuration) {
    if (configuration.getProcessEnginePlugins() == null) {
      configuration.setProcessEnginePlugins(new ArrayList<>());
    }

    if (configuration.getBatchHandlers() == null) {
      configuration.setBatchHandlers(new HashMap<>());
    }

    if (configuration.getBeans() == null) {
      configuration.setBeans(new HashMap<>());
    }

    if (configuration.getCommandCheckers() == null) {
      configuration.setCommandCheckers(new ArrayList<>());
    }

    if (configuration.getCustomPostBPMNParseListeners() == null) {
      configuration.setCustomPostBPMNParseListeners(new ArrayList<>());
    }

    return configuration;
  }

  public static Optional<ProcessEngineImpl> processEngineImpl(ProcessEngine processEngine) {
    Optional<ProcessEngineImpl> engine = CamundaSpringBootUtil.cast(processEngine, ProcessEngineImpl.class);

    return engine;
  }

  public static Optional<SpringProcessEngineConfiguration> springProcessEngineConfiguration(ProcessEngineConfiguration configuration) {
    final Optional<SpringProcessEngineConfiguration> cast = cast(configuration, SpringProcessEngineConfiguration.class);

    return cast;
  }

  public static SpringProcessEngineConfiguration get(ProcessEngine processEngine) {
    return (SpringProcessEngineConfiguration) processEngine.getProcessEngineConfiguration();
  }

  /**
   * @param existing
   *          the current values (may be null or empty)
   * @param add
   *          the additional values (may be null or empty)
   * @param <T>
   *          type of elements
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

  private CamundaSpringBootUtil() {}
}
