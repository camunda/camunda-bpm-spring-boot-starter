package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertNull;

import javax.transaction.Transactional;

import org.camunda.bpm.spring.boot.starter.test.TestNoJobExecutionApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TestNoJobExecutionApplication.class }, webEnvironment = WebEnvironment.NONE)
@Transactional
public class CamundaNoJobExecutionAutoConfigurationIT extends AbstractCamundaAutoConfigurationIT {

  @Test
  public void jobConfigurationTest() {
    assertNull(jobExecutor);
  }

}
