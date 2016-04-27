package org.camunda.bpm.spring.boot.starter.webapp.filter;

import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplicationRunListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

public class LazyFilterRuntimeListener implements SpringApplicationRunListener {
  private final Logger logger = LoggerFactory.getLogger(getClass());

  public LazyFilterRuntimeListener(SpringApplication application, String[] args) {
    // convention
  }

  @Override
  public void started() {

  }

  @Override
  public void environmentPrepared(ConfigurableEnvironment environment) {

  }

  @Override
  public void contextPrepared(ConfigurableApplicationContext context) {

  }

  @Override
  public void contextLoaded(ConfigurableApplicationContext context) {
  }

  @Override
  public void finished(ConfigurableApplicationContext context, Throwable exception) {
    if (context.containsBean("resourceLoaderDependingInitHook")) {
      @SuppressWarnings("unchecked")
      InitHook<ResourceLoaderDependingFilter> initHook = context.getBean("resourceLoaderDependingInitHook", InitHook.class);
      init(LazySecurityFilter.INSTANCE, initHook);
      init(LazyProcessEnginesFilter.INSTANCE, initHook);
    } else {
      logger.warn("Finished lazy runtime listener without access to resourceLoaderDependingInitHook");
    }
  }

  private void init(LazyDelegateFilter<ResourceLoaderDependingFilter> filter, InitHook<ResourceLoaderDependingFilter> initHook) {
    filter.setInitHook(initHook);
    filter.lazyInit();
  }

}
