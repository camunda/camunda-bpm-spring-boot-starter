package org.camunda.bpm.spring.boot.starter;


import org.apache.commons.lang.StringUtils;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CamundaBpmVersionTest {

  @Test
  public void versionTest() {
    String version = CamundaBpmVersion.getVersion();
    assertThat(StringUtils.isNotBlank(version)).as("expected something like 7.4.x").isTrue();
  }

  @Test
  public void is_current_version() throws Exception {
    assertThat(CamundaBpmVersion.getVersion()).isEqualTo("7.5.0");
  }
}
