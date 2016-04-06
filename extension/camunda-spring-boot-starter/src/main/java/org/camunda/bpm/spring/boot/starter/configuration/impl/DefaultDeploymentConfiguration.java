package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceArrayPropertyEditor;

import java.util.Arrays;

public class DefaultDeploymentConfiguration extends AbstractCamundaConfiguration implements CamundaDeploymentConfiguration {

  @Override
  public void apply(SpringProcessEngineConfiguration configuration) {
    if (camundaBpmProperties.isAutoDeploymentEnabled()) {
      configuration.setDeploymentResources(getDeploymentResources());
    }
  }

  protected Resource[] getDeploymentResources() {
    Resource[] resources = null;

    ResourceArrayPropertyEditor resolver = new ResourceArrayPropertyEditor();
    try {
      String[] resourcePattern = camundaBpmProperties.getDeploymentResourcePattern();
      logger.debug("resolving deployment resources for pattern {}", (String[])resourcePattern);
      resolver.setValue(resourcePattern);
      resources = (Resource[]) resolver.getValue();
      logger.debug("resolved {}", Arrays.asList(resources));
    } catch (RuntimeException e) {
      logger.error("unable to resolve resources", e);
    }
    return resources;
  }

}
