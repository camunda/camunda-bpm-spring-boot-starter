package org.camunda.bpm.spring.boot.starter;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.springframework.test.context.TestPropertySource;

@TestPropertySource(properties = {"camunda.bpm.application.delete-upon-undeploy=true", "camunda.bpm.application.scan-for-process-definitions=false",
  "camunda.bpm.application.deploy-changed-only=true", "camunda.bpm.application.resume-previous-versions=true"})
public class ApplicationPropertiesHelper extends ParsePropertiesHelper {

  @Test
  public void verifyCorrectProperties() throws Exception {

    assertThat(application.isDeleteUponUndeploy()).isEqualTo(true);
    assertThat(application.isScanForProcessDefinitions()).isEqualTo(false);
    assertThat(application.isDeployChangedOnly()).isEqualTo(true);
    assertThat(application.isResumePreviousVersions()).isEqualTo(true);
  }
}
