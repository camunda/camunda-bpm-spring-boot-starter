package org.camunda.bpm.spring.boot.starter.webapp.filter;

public class LazySecurityFilter extends LazyDelegateFilter<ResourceLoaderDependingFilter> {

  protected static LazySecurityFilter INSTANCE;

  public LazySecurityFilter() {
    super(ResourceLoadingSecurityFilter.class);
    INSTANCE = this;
  }

}
