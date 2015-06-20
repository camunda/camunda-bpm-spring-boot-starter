package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.rest.impl.CamundaRestResources;
import org.glassfish.jersey.server.ResourceConfig;
import org.jboss.resteasy.plugins.server.servlet.FilterDispatcher;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@Configuration
@ConditionalOnWebApplication
@ConditionalOnClass({ResourceConfig.class, FilterDispatcher.class})
@ConditionalOnProperty(prefix = "camunda.bpm.rest", name = "enabled", matchIfMissing = true)
public class CamundaBpmRestConfiguration {

  @Bean
  @ConditionalOnMissingBean(name = "filterDispatcherRegistrationBean")
  public FilterRegistrationBean filterDispatcherRegistrationBean(
    @Qualifier("filterDispatcher") Filter filterDispatcher) {
    FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
    filterRegistrationBean.setName("Resteasy");
    filterRegistrationBean.setFilter(filterDispatcher);
    filterRegistrationBean.addUrlPatterns("/*");
    filterRegistrationBean.addInitParameter("javax.ws.rs.Application",
      RestProcessEngineDeployment.class.getName());
    return filterRegistrationBean;
  }

  @Bean
  @ConditionalOnMissingBean(name = "filterDispatcher")
  public static Filter filterDispatcher() {
    return new FilterDispatcher();
  }

  @Configuration
  @ConditionalOnWebApplication
  public static class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
      this.registerClasses(CamundaRestResources.getResourceClasses());
      this.registerClasses(CamundaRestResources.getConfigurationClasses());
    }
  }

  public static class RestProcessEngineDeployment extends Application {

    @Override
    public Set<Class<?>> getClasses() {
      Set<Class<?>> classes = new HashSet<Class<?>>();

      classes.addAll(CamundaRestResources.getResourceClasses());
      classes.addAll(CamundaRestResources.getConfigurationClasses());

      return classes;
    }

  }
}
