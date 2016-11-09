package org.camunda.bpm.spring.boot.starter.util;

import java.util.Optional;

import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.cfg.AbstractProcessEnginePlugin;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.beans.factory.BeanNameAware;

/**
 * Convenience class that specializes {@link AbstractProcessEnginePlugin} to
 * use {@link SpringProcessEngineConfiguration} (to save casting).
 *
 * FIXME: extend springProcessEnginePlugin from engine-cdi when switching to 7.6
 */
public class SpringProcessEnginePlugin extends AbstractProcessEnginePlugin implements BeanNameAware {

  /**
   *
   * @param obj
   *          that should be casted
   * @param type
   *          to cast
   * @return optional casted object
   */
  @SuppressWarnings("unchecked")
  public static <T> Optional<T> cast(Object obj, Class<T> type) {
    if (type.isInstance(obj)) {
      return Optional.of((T) obj);
    }
    return Optional.empty();
  }

  public static Optional<SpringProcessEngineConfiguration> cast(
    ProcessEngineConfiguration processEngineConfiguration) {
    return cast(processEngineConfiguration, SpringProcessEngineConfiguration.class);
  }

  private String beanName;

  @Override
  public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
    cast(processEngineConfiguration)
      .ifPresent(this::preInit);
  }

  @Override
  public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
    cast(processEngineConfiguration)
      .ifPresent(this::postInit);
  }

  public void preInit(SpringProcessEngineConfiguration processEngineConfiguration) {

  }

  public void postInit(SpringProcessEngineConfiguration processEngineConfiguration) {

  }

  @Override
  public void setBeanName(String beanName) {
    this.beanName = beanName;
  }
}
