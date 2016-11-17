package org.camunda.bpm.spring.boot.starter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;
import static org.springframework.test.util.ReflectionTestUtils.setField;

import org.apache.commons.lang.StringUtils;
import org.assertj.core.api.Assertions;
import org.camunda.bpm.spring.boot.starter.util.CamundaBpmVersion;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

public class CamundaBpmVersionTest {

  @Test
  public void versionTest() {
    String version = CamundaBpmVersion.INSTANCE.get();
    assertTrue("expected sth. like 7.4.xx", StringUtils.isNotBlank(version));
  }

  @Test
  public void isEnterprise_true() throws Exception {
    setField(CamundaBpmVersion.INSTANCE, "version", Optional.of("7.5.0-ee"));

    assertThat(CamundaBpmVersion.INSTANCE.isEnterprise()).isTrue();
  }

  @Test
  public void isEnterprise_false() throws Exception {
    setField(CamundaBpmVersion.INSTANCE, "version", Optional.of("7.5.0"));

    assertThat(CamundaBpmVersion.INSTANCE.isEnterprise()).isFalse();
  }
}
