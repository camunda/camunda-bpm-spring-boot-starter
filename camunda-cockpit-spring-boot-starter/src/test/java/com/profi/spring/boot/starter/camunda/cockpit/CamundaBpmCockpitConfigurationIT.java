package com.profi.spring.boot.starter.camunda.cockpit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { TestApplication.class })
@WebAppConfiguration
@IntegrationTest({ "server.port=0" })
@DirtiesContext
public class CamundaBpmCockpitConfigurationIT {

    @Test
    public void test() {
        // not implemented yet
    }

}
