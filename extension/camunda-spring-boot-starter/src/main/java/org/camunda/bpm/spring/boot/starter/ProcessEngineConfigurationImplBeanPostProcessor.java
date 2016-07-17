package org.camunda.bpm.spring.boot.starter;

import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.util.CollectionUtils;

class ProcessEngineConfigurationImplBeanPostProcessor implements BeanPostProcessor {

  protected final List<ProcessEnginePlugin> processEnginePlugins;

  protected ProcessEngineConfigurationImplBeanPostProcessor(List<ProcessEnginePlugin> processEnginePlugins) {
    this.processEnginePlugins = processEnginePlugins;
  }

  @Override
  public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
    return bean;
  }

  @Override
  public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
    if (bean instanceof ProcessEngineConfigurationImpl) {
      setProcessEnginePlugins((ProcessEngineConfigurationImpl) bean);
    }
    return bean;
  }

  protected void setProcessEnginePlugins(ProcessEngineConfigurationImpl configuration) {
    if (!CollectionUtils.isEmpty(configuration.getProcessEnginePlugins())) {
      configuration.getProcessEnginePlugins().addAll(processEnginePlugins);
    } else {
      configuration.setProcessEnginePlugins(processEnginePlugins);
    }
  }

}