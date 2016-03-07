package org.camunda.bpm.spring.boot.starter.rest;

import org.camunda.bpm.engine.rest.impl.CamundaRestResources;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.ws.rs.ApplicationPath;

@ApplicationPath("/rest")
public class CamundaJerseyResourceConfig extends ResourceConfig {

  protected final Logger logger = LoggerFactory.getLogger(this.getClass());

  @PostConstruct
  public void registerCamundaRestResources() {
    logger.info("Configuring camunda rest api.");

    this.registerClasses(CamundaRestResources.getResourceClasses());
    this.registerClasses(CamundaRestResources.getConfigurationClasses());
    this.register(JacksonFeature.class);

    logger.info("Finished configuring camunda rest api.");
  }

}

