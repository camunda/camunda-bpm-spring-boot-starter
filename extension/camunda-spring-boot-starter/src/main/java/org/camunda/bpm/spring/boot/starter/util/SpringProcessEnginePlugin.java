package org.camunda.bpm.spring.boot.starter.util;

import org.camunda.bpm.engine.impl.cfg.AbstractProcessEnginePlugin;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.beans.factory.BeanNameAware;

/**
 * Convenience class that specializes {@link AbstractProcessEnginePlugin} to
 * use {@link SpringProcessEngineConfiguration} (to save casting).
 */
public class SpringProcessEnginePlugin extends AbstractProcessEnginePlugin implements BeanNameAware {

  private String beanName;

  @Override
  public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
    if (processEngineConfiguration instanceof SpringProcessEngineConfiguration) {
      preInit((SpringProcessEngineConfiguration) processEngineConfiguration);
    }
  }

  @Override
  public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
    if (processEngineConfiguration instanceof SpringProcessEngineConfiguration) {
      postInit((SpringProcessEngineConfiguration) processEngineConfiguration);
    }
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
