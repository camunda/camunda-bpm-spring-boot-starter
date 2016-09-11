package org.camunda.bpm.spring.boot.starter.rest;

import javax.ws.rs.ApplicationPath;

import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.engine.rest.impl.CamundaRestResources;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;

@ApplicationPath("/rest")
@Slf4j
public class CamundaJerseyResourceConfig extends ResourceConfig implements InitializingBean {

  @Override
  public void afterPropertiesSet() throws Exception {
    registerCamundaRestResources();
    registerAdditionalResources();
  }

  protected void registerCamundaRestResources() {
    log.info("Configuring camunda rest api.");

    this.registerClasses(CamundaRestResources.getResourceClasses());
    this.registerClasses(CamundaRestResources.getConfigurationClasses());
    this.register(JacksonFeature.class);

    log.info("Finished configuring camunda rest api.");
  }

  protected void registerAdditionalResources() {

  }
}
