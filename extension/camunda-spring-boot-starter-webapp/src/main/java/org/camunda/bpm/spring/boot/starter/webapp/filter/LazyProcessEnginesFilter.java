package org.camunda.bpm.spring.boot.starter.webapp.filter;

public class LazyProcessEnginesFilter extends LazyDelegateFilter<ResourceLoaderDependingFilter> {

  protected static LazyProcessEnginesFilter INSTANCE;

  static org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook<ResourceLoaderDependingFilter> INIT_HOOK = null;

  public LazyProcessEnginesFilter() {
    super(ResourceLoadingProcessEnginesFilter.class);
    INSTANCE = this;
  }

}
