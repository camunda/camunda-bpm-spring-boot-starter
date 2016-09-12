package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertNotNull;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = CamundaJobExecutionAutoConfigurationIT.Application.class, webEnvironment = WebEnvironment.NONE)
@Transactional
public class CamundaJobExecutionAutoConfigurationIT extends AbstractCamundaAutoConfigurationIT {

  @EnableAutoConfiguration
  @ComponentScan(excludeFilters = @Filter(Configuration.class))
  @PropertySource("application.properties")
  public static class Application {

  }

  @Test
  public void jobConfigurationTest() {
    assertNotNull(jobExecutor);
  }

}
