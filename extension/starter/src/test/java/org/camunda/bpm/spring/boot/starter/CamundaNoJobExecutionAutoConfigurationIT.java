package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.spring.boot.starter.test.TestNoJobExecutionApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

import static org.junit.Assert.assertNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { TestNoJobExecutionApplication.class })
@Transactional
public class CamundaNoJobExecutionAutoConfigurationIT extends AbstractCamundaAutoConfigurationIT {

  @Test
  public void jobConfigurationTest() {
    assertNull(jobExecutor);
  }

}
