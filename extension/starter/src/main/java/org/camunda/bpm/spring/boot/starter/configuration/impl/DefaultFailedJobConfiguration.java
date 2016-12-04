package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.bpmn.parser.BpmnParseListener;
import org.camunda.bpm.engine.impl.bpmn.parser.FoxFailedJobParseListener;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.jobexecutor.FoxFailedJobCommandFactory;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaFailedJobConfiguration;

import java.util.ArrayList;
import java.util.List;


/**
 * Register parselistener to setup failed job retry specification
 */
public class DefaultFailedJobConfiguration extends AbstractCamundaConfiguration implements CamundaFailedJobConfiguration {

  @Override
  public void preInit(ProcessEngineConfigurationImpl configuration) {
    List<BpmnParseListener> postBPMNParseListeners = configuration.getCustomPostBPMNParseListeners();
    if (postBPMNParseListeners == null) {
      postBPMNParseListeners = new ArrayList<>();
      configuration.setCustomPostBPMNParseListeners(postBPMNParseListeners);
    }
    postBPMNParseListeners.add(new FoxFailedJobParseListener());
    configuration.setFailedJobCommandFactory(new FoxFailedJobCommandFactory());
  }
}
