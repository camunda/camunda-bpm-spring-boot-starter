package com.profi.spring.boot.starter.camunda.configuration;

import java.util.Comparator;

public class CamundaConfigurationComparator implements Comparator<CamundaConfiguration> {

    @Override
    public int compare(CamundaConfiguration o1, CamundaConfiguration o2) {
        return o1.getOrder() - o2.getOrder();
    }

}
