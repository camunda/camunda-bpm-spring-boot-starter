package org.camunda.bpm.spring.boot.starter;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CamundaBpmPropertiesTest {

  @Test
  public void initResourcePatterns() {
    final String[] patterns = CamundaBpmProperties.initDeploymentResourcePattern();

    assertThat(patterns).hasSize(7);
    assertThat(patterns).containsOnly("classpath*:**/*.bpmn",
      "classpath*:**/*.bpmn20.xml",
      "classpath*:**/*.dmn",
      "classpath*:**/*.dmn11.xml",
      "classpath*:**/*.cmmn",
      "classpath*:**/*.cmmn10.xml",
      "classpath*:**/*.cmmn11.xml");
  }

  @Test
  public void application_defaults() throws Exception {
      assertThat(new CamundaBpmProperties().getApplication().isDeleteUponUndeploy()).isFalse();
  }
}
