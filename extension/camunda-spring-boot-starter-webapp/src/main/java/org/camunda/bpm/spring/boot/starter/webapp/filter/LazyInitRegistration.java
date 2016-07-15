package org.camunda.bpm.spring.boot.starter.webapp.filter;

import java.util.HashMap;
import java.util.Map;

import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;

public class LazyInitRegistration {

  @SuppressWarnings("rawtypes")
  private static final Map<Class<? extends LazyDelegateFilter>, InitHook<ResourceLoaderDependingFilter>> REGISTRATION = new HashMap<Class<? extends LazyDelegateFilter>, LazyDelegateFilter.InitHook<ResourceLoaderDependingFilter>>();

  @SuppressWarnings("rawtypes")
  public static void addInitHookRegistration(Class<? extends LazyDelegateFilter> lazyDelegateFilterClass, InitHook<ResourceLoaderDependingFilter> initHook) {
    REGISTRATION.put(lazyDelegateFilterClass, initHook);
  }

  @SuppressWarnings("rawtypes")
  public static boolean hasInitHookRegistrationFor(Class<? extends LazyDelegateFilter> lazyDelegateFilterClass) {
    return REGISTRATION.containsKey(lazyDelegateFilterClass);
  }

  @SuppressWarnings("rawtypes")
  public static InitHook<ResourceLoaderDependingFilter> getInitHookFor(Class<? extends LazyDelegateFilter> lazyDelegateFilterClass) {
    return REGISTRATION.get(lazyDelegateFilterClass);
  }

  @SuppressWarnings({ "rawtypes", "unchecked" })
  public static boolean lazyInit(LazyDelegateFilter lazyDelegateFilter) {
    boolean canInit = lazyDelegateFilter != null && hasInitHookRegistrationFor(lazyDelegateFilter.getClass());
    if (canInit) {
      lazyDelegateFilter.setInitHook(LazyInitRegistration.getInitHookFor(lazyDelegateFilter.getClass()));
      lazyDelegateFilter.lazyInit();
    }

    return canInit;
  }
}
