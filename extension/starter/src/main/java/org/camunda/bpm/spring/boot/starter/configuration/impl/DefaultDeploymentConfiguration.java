package org.camunda.bpm.spring.boot.starter.configuration.impl;

import java.io.IOException;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceArrayPropertyEditor;

public class DefaultDeploymentConfiguration extends AbstractCamundaConfiguration implements CamundaDeploymentConfiguration {
  private final Logger logger = LoggerFactory.getLogger(DefaultDeploymentConfiguration.class);

  @Override
  public void preInit(SpringProcessEngineConfiguration configuration) {
    if (camundaBpmProperties.isAutoDeploymentEnabled()) {
      configuration.setDeploymentResources(getDeploymentResources());
    }
  }

  protected Resource[] getDeploymentResources() {
    final Set<Resource> resources = new HashSet<>();
    final ResourceArrayPropertyEditor resolver = new ResourceArrayPropertyEditor();

    try {
      final String[] resourcePattern = camundaBpmProperties.getDeploymentResourcePattern();
      logger.debug("resolving deployment resources for pattern {}", (Object[]) resourcePattern);
      resolver.setValue(resourcePattern);

      for (Resource resource : (Resource[]) resolver.getValue()) {
        logger.debug("processing deployment resource {}", resource);
        if (isFile(resource)) {
          resources.add(resource);
          logger.debug("added deployment resource {}", resource);
        }
      }

      logger.debug("resolved {}", resources);
    } catch (RuntimeException e) {
      logger.error("unable to resolve resources", e);
    }
    return resources.toArray(new Resource[resources.size()]);
  }

  private boolean isFile(Resource resource) {
    if (resource.isReadable()) {
      if (resource instanceof UrlResource) {
        try {
          URL url = resource.getURL();
          return !url.toString().endsWith("/");
        } catch (IOException e) {
          logger.debug("unable to handle " + resource + " as URL", e);
        }
      } else {
        try {
          return !resource.getFile().isDirectory();
        } catch (IOException e) {
          logger.debug("unable to handle " + resource + " as file", e);
        }
      }
    }
    logger.warn("unable to determine if resource {} is a deployable resource", resource);
    return false;
  }

}
