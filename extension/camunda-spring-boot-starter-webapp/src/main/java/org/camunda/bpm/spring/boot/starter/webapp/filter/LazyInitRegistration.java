package org.camunda.bpm.spring.boot.starter.webapp.filter;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class LazyInitRegistration implements ApplicationContextAware {

  protected static final String RESOURCE_LOADER_DEPENDING_INIT_HOOK = "resourceLoaderDependingInitHook";

  @SuppressWarnings("rawtypes")
  protected static final Set<LazyDelegateFilter> REGISTRATION = new HashSet<LazyDelegateFilter>();

  protected static ApplicationContext APPLICATION_CONTEXT;

  private static final Logger LOGGER = LoggerFactory.getLogger(LazyInitRegistration.class);

  static void register(LazyDelegateFilter<?> lazyDelegateFilter) {
    REGISTRATION.add(lazyDelegateFilter);
  }

  @SuppressWarnings({ "rawtypes" })
  protected static InitHook getInitHook() {
    if (APPLICATION_CONTEXT != null && APPLICATION_CONTEXT.containsBean(RESOURCE_LOADER_DEPENDING_INIT_HOOK)) {
      return APPLICATION_CONTEXT.getBean(RESOURCE_LOADER_DEPENDING_INIT_HOOK, InitHook.class);
    } else {
      LOGGER.warn("Finished lazy runtime listener without access to {}", RESOURCE_LOADER_DEPENDING_INIT_HOOK);
    }
    return null;
  }

  static boolean hasInitHookRegistrationFor(LazyDelegateFilter<?> lazyDelegateFilter) {
    return REGISTRATION.contains(lazyDelegateFilter);
  }

  @SuppressWarnings({ "rawtypes", "unchecked" })
  static boolean lazyInit(LazyDelegateFilter lazyDelegateFilter) {
    if (APPLICATION_CONTEXT != null) {
      if (hasInitHookRegistrationFor(lazyDelegateFilter)) {
        lazyDelegateFilter.setInitHook(getInitHook());
        lazyDelegateFilter.lazyInit();
        REGISTRATION.remove(lazyDelegateFilter);
        LOGGER.info("lazy initialized {}", lazyDelegateFilter);
        return true;
      } else {
        LOGGER.debug("skipping lazy init for {} because of no init hook registration");
      }
    } else {
      LOGGER.debug("skipping lazy init for {} because application context not initialized yet");
    }

    return false;
  }

  @SuppressWarnings("rawtypes")
  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    APPLICATION_CONTEXT = applicationContext;
    for (LazyDelegateFilter lazyDelegateFilter : getRegistrations()) {
      lazyInit(lazyDelegateFilter);
    }
  }

  @SuppressWarnings("rawtypes")
  static Set<LazyDelegateFilter> getRegistrations() {
    return Collections.unmodifiableSet(new HashSet<LazyDelegateFilter>(REGISTRATION));
  }
}
