package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import java.io.IOException;
import java.util.Arrays;

public class DefaultDeploymentConfiguration extends AbstractCamundaConfiguration implements
  CamundaDeploymentConfiguration {

  private static final Logger LOGGER = LoggerFactory
    .getLogger(DefaultDeploymentConfiguration.class);

  @Override
  public void apply(SpringProcessEngineConfiguration configuration) {
    if (camundaBpmProperties.isAutoDeploymentEnabled()) {
      configuration.setDeploymentResources(getDeploymentResources());
    }
  }

  protected Resource[] getDeploymentResources() {
    Resource[] resources = null;
    ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    try {
      String resourcePattern = camundaBpmProperties.getDeploymentResourcePattern();
      LOGGER.debug("resolving deployment resources for pattern {}", resourcePattern);
      resources = resolver.getResources(resourcePattern);
      LOGGER.debug("resolved {}", Arrays.asList(resources));
    } catch (IOException e) {
      LOGGER.error("unable to resolve resources", e);
    }
    return resources;
  }

}
