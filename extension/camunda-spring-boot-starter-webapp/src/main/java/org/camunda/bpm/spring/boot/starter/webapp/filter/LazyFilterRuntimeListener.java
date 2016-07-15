package org.camunda.bpm.spring.boot.starter.webapp.filter;

import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
      registerAndInit(getClassFrom(LazySecurityFilter.INSTANCE, LazySecurityFilter.class), LazySecurityFilter.INSTANCE, initHook);
      registerAndInit(getClassFrom(LazyProcessEnginesFilter.INSTANCE, LazyProcessEnginesFilter.class), LazyProcessEnginesFilter.INSTANCE, initHook);
    } else {
      logger.warn("Finished lazy runtime listener without access to resourceLoaderDependingInitHook");
    }
  }

  @SuppressWarnings("unchecked")
  private <T extends LazyDelegateFilter<?>> Class<T> getClassFrom(T instance, Class<T> clazz) {
    return (Class<T>) (instance == null ? clazz : instance.getClass());
  }

  private <T extends LazyDelegateFilter<ResourceLoaderDependingFilter>> void registerAndInit(Class<T> filterClass, T filter,
      InitHook<ResourceLoaderDependingFilter> initHook) {
    LazyInitRegistration.addInitHookRegistration(filterClass, initHook);
    LazyInitRegistration.lazyInit(filter);
  }

}
