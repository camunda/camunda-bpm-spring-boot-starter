package org.camunda.bpm.spring.boot.starter.webapp.filter;

import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplicationRunListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

public class LazyFilterRuntimeListener implements SpringApplicationRunListener {

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
    @SuppressWarnings("unchecked")
    InitHook<ResourceLoaderDependingFilter> initHook = context.getBean("resourceLoaderDependingInitHook", InitHook.class);
    init(LazySecurityFilter.INSTANCE, initHook);
    init(LazyProcessEnginesFilter.INSTANCE, initHook);
  }

  private void init(LazyDelegateFilter<ResourceLoaderDependingFilter> filter, InitHook<ResourceLoaderDependingFilter> initHook) {
    filter.setInitHook(initHook);
    filter.lazyInit();
  }

}
