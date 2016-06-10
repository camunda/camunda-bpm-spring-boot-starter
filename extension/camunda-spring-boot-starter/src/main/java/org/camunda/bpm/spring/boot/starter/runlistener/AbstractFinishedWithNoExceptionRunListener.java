package org.camunda.bpm.spring.boot.starter.runlistener;

import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.slf4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplicationRunListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

abstract class AbstractFinishedWithNoExceptionRunListener implements SpringApplicationRunListener {

  /**
   * convention constructor for SpringApplicationRunListener
   * <p/>
   * automatically called when registered in spring.factories
   *
   * @param application started application
   * @param args        application arguments
   */
  public AbstractFinishedWithNoExceptionRunListener(SpringApplication application, String[] args) {
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
  public final void finished(ConfigurableApplicationContext context, Throwable exception) {
    if (exception == null) {
      CamundaBpmProperties camundaBpmProperties = getBean(context, CamundaBpmProperties.class);
      if (camundaBpmProperties != null)
    	  finishedWithNoException(context, camundaBpmProperties);
    } else {
      getLogger().warn("skipping because of failed context initialization");
    }
  }

  /**
   * Equivalent to {@link #getBean(ConfigurableApplicationContext, Class)},
   * except any exceptions will be ignored.
   *
   * @param context      to get bean from
   * @param requiredType see
   *                     {@link org.springframework.beans.factory.BeanFactory#getBean(Class)}
   * @return see
   * {@link org.springframework.beans.factory.BeanFactory#getBean(Class)}
   */
  protected <T> T getBeanQuietly(ConfigurableApplicationContext context, Class<T> requiredType) {
    try {
      return getBean(context, requiredType);
    } catch (Exception e) {
      getLogger().debug("unable to get bean for " + requiredType, e);
    }

    return null;
  }

  /**
   * @param context      to get bean from
   * @param requiredType see
   *                     {@link org.springframework.beans.factory.BeanFactory#getBean(Class)}
   * @return see
   * {@link org.springframework.beans.factory.BeanFactory#getBean(Class)}
   *
   * @see org.springframework.beans.factory.BeanFactory#getBean(Class)
   */
  protected <T> T getBean(ConfigurableApplicationContext context, Class<T> requiredType) {
    return context.getBean(requiredType);
  }

  /**
   * @return the logger
   */
  protected abstract Logger getLogger();

  /**
   * is called when no exception occurred in context initialization
   *
   * @param context              initialized context
   * @param camundaBpmProperties camunda properties in the context
   */
  protected abstract void finishedWithNoException(ConfigurableApplicationContext context, CamundaBpmProperties camundaBpmProperties);

}
