package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.rest.impl.CamundaRestResources;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import javax.ws.rs.ApplicationPath;
import java.util.logging.Logger;

@Configuration
@ConditionalOnWebApplication
@ConditionalOnClass(org.camunda.bpm.engine.rest.impl.CamundaRestResources.class)
@ConditionalOnProperty(prefix = "camunda.bpm.rest", name = "enabled", matchIfMissing = true)
@AutoConfigureBefore(JerseyAutoConfiguration.class)
public class CamundaBpmRestConfiguration {

  protected Logger logger = Logger.getLogger(this.getClass().getName());

  @Bean
  @ConditionalOnMissingBean(type = "org.glassfish.jersey.server.ResourceConfig")
  public ResourceConfig jerseyConfig() {
    return new CamundaJerseyConfig();
  }

  @ApplicationPath("/rest")
  public static class CamundaJerseyConfig extends ResourceConfig {

    protected Logger logger = Logger.getLogger(this.getClass().getName());

    @PostConstruct
    public void registerCamundaRestResources() {
      logger.info("Configuring camunda rest api.");

      this.registerClasses(CamundaRestResources.getResourceClasses());
      this.registerClasses(CamundaRestResources.getConfigurationClasses());
      this.register(JacksonFeature.class);

      logger.info("Finished configuring camunda rest api.");
    }

  }

}
