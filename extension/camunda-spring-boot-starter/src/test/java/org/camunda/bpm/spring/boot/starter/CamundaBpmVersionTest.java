package org.camunda.bpm.spring.boot.starter;

import static org.junit.Assert.assertTrue;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;

public class CamundaBpmVersionTest {

  @Test
  public void versionTest() {
    String version = CamundaBpmVersion.getVersion();
    assertTrue("expected sth. like 7.4.xx", StringUtils.isNotBlank(version));
  }
}
