package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.filter.Filter;

public class CreateFilterConfiguration extends AbstractCamundaConfiguration {

  @Override
  public void postProcessEngineBuild(final ProcessEngine processEngine) {
    Filter filter = processEngine.getFilterService().newTaskFilter(filterName());
    processEngine.getFilterService().saveFilter(filter);
  }

  private String filterName() {
    return camundaBpmProperties.getFilter().getCreate();
  }
}
