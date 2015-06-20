package org.camunda.bpm.spring.boot.starter.configuration.impl;

import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

public class DefaultProcessEngineConfiguration extends AbstractCamundaConfiguration
        implements CamundaProcessEngineConfiguration {

    @Autowired(required = false)
    private List<ProcessEnginePlugin> processEnginePlugins;

    @Override
    public void apply(SpringProcessEngineConfiguration configuration) {
        String processEngineName = camundaBpmProperties.getProcessEngineName();
        if (!StringUtils.isEmpty(processEngineName)) {
            configuration.setProcessEngineName(processEngineName);
        }

        if (!CollectionUtils.isEmpty(processEnginePlugins)) {
            configuration.setProcessEnginePlugins(processEnginePlugins);
        }
    }

}
