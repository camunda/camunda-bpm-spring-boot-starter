package org.camunda.bpm.spring.boot.starter.rest;

import org.camunda.bpm.engine.rest.impl.CamundaRestResources;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.ws.rs.ApplicationPath;

@ApplicationPath("/rest")
public class CamundaJerseyResourceConfig extends ResourceConfig {

  protected final Logger logger = Logger.getLogger(this.getClass().getName());

  @PostConstruct
  public void registerCamundaRestResources() {
    logger.info("Configuring camunda rest api.");

    this.registerClasses(CamundaRestResources.getResourceClasses());
    this.registerClasses(CamundaRestResources.getConfigurationClasses());
    this.register(JacksonFeature.class);

    logger.info("Finished configuring camunda rest api.");
  }

}

