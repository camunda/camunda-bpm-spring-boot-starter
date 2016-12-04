package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.bpmn.parser.BpmnParseListener;
import org.camunda.bpm.engine.impl.bpmn.parser.FoxFailedJobParseListener;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.jobexecutor.FoxFailedJobCommandFactory;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaFailedJobConfiguration;
import org.camunda.bpm.spring.boot.starter.util.CamundaSpringBootUtil;

import java.util.ArrayList;
import java.util.List;

import static org.camunda.bpm.spring.boot.starter.util.CamundaSpringBootUtil.init;


/**
 * Register parselistener to setup failed job retry specification
 */
public class DefaultFailedJobConfiguration extends AbstractCamundaConfiguration implements CamundaFailedJobConfiguration {

  @Override
  public void preInit(SpringProcessEngineConfiguration configuration) {
    init(configuration);

    configuration.getCustomPostBPMNParseListeners().add(new FoxFailedJobParseListener());
    configuration.setFailedJobCommandFactory(new FoxFailedJobCommandFactory());
  }
}
