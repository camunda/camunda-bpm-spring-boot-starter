package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceArrayPropertyEditor;

import java.util.HashSet;
import java.util.Set;

public class DefaultDeploymentConfiguration extends AbstractCamundaConfiguration implements CamundaDeploymentConfiguration {

  private final Logger logger = LoggerFactory.getLogger(DefaultDeploymentConfiguration.class);

  @Override
  public void apply(SpringProcessEngineConfiguration configuration) {
    if (camundaBpmProperties.isAutoDeploymentEnabled()) {
      configuration.setDeploymentResources(getDeploymentResources());
    }
  }

  protected Resource[] getDeploymentResources() {
    final Set<Resource> resources = new HashSet<Resource>();
    final ResourceArrayPropertyEditor resolver = new ResourceArrayPropertyEditor();

    try {
      final String[] resourcePattern = camundaBpmProperties.getDeploymentResourcePattern();
      logger.debug("resolving deployment resources for pattern {}", resourcePattern);
      resolver.setValue(resourcePattern);

      for (Resource resource : (Resource[]) resolver.getValue()) {
        if ("org.camunda.bpm.dmn".equals(resource.getFilename())) {
          continue;
        }
        resources.add(resource);
      }

      logger.debug("resolved {}", resources);
    } catch (RuntimeException e) {
      logger.error("unable to resolve resources", e);
    }
    return resources.toArray(new Resource[resources.size()]);
  }

}
