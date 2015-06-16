package com.profi.spring.boot.starter.camunda.configuration;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;

public interface CamundaConfiguration {

    public static final int DEFAULT_ORDER = 0;

    void apply(SpringProcessEngineConfiguration configuration);

    int getOrder();
}
