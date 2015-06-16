package com.profi.spring.boot.starter.camunda;

import static org.junit.Assert.assertNull;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.profi.spring.boot.starter.camunda.test.TestNoJobExecutionApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { TestNoJobExecutionApplication.class })
@Transactional
public class CamundaNoJobExecutionAutoConfigurationIT extends
        AbstractCamundaAutoConfigurationIT {

    @Test
    public void jobConfigurationTest() {
        assertNull(jobExecutor);
    }

}
