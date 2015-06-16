package com.profi.spring.boot.starter.camunda;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.junit.Test;

import com.profi.spring.boot.starter.camunda.configuration.CamundaConfiguration;

public class CamundaBpmConfigurationTest {

    @Test
    public void orderedConfigurationTest() {
        CamundaBpmConfiguration camundaBpmConfiguration = new CamundaBpmConfiguration();
        Collection<CamundaConfiguration> unordedList = createUnordedList();
        camundaBpmConfiguration.setCamundaConfigurations(unordedList);
        List<CamundaConfiguration> configurationsOrdered = camundaBpmConfiguration.camundaConfigurationsOrdered;
        assertFalse(configurationsOrdered.isEmpty());
        assertNotSame(unordedList, configurationsOrdered);

        int priorOrder = Integer.MIN_VALUE;
        for (CamundaConfiguration camundaConfiguration : configurationsOrdered) {
            int order = camundaConfiguration.getOrder();
            assertTrue("unordered list", priorOrder <= order);
            priorOrder = order;
        }
    }

    @Test
    public void processEngineConfigurationImplTest() {
        CamundaBpmConfiguration camundaBpmConfiguration = new CamundaBpmConfiguration();
        Collection<CamundaConfiguration> camundaConfigurations = createUnordedList();
        camundaBpmConfiguration.setCamundaConfigurations(camundaConfigurations);
        ProcessEngineConfigurationImpl processEngineConfigurationImpl = camundaBpmConfiguration
                .processEngineConfigurationImpl();
        for (CamundaConfiguration camundaConfiguration : camundaConfigurations) {
            verify(camundaConfiguration).apply(
                    (SpringProcessEngineConfiguration) processEngineConfigurationImpl);
        }
    }

    private Collection<CamundaConfiguration> createUnordedList() {
        Collection<CamundaConfiguration> list = new ArrayList<>();
        list.add(createConfiguration(5));
        list.add(createConfiguration(4));
        list.add(createConfiguration(7));
        list.add(createConfiguration(7));
        list.add(createConfiguration(1));
        list.add(createConfiguration(10));
        return list;
    }

    private CamundaConfiguration createConfiguration(int order) {
        CamundaConfiguration mock = mock(CamundaConfiguration.class);
        when(mock.getOrder()).thenReturn(order);
        return mock;
    }
}
