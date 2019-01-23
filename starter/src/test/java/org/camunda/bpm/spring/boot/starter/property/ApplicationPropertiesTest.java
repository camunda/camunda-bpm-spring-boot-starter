/*
 * Copyright © 2015-2018 camunda services GmbH and various authors (info@camunda.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.camunda.bpm.spring.boot.starter.property;

import static org.assertj.core.api.Assertions.assertThat;

import org.camunda.bpm.spring.boot.starter.property.ParsePropertiesHelper;
import org.junit.Test;
import org.springframework.test.context.TestPropertySource;

@TestPropertySource(properties = {"camunda.bpm.application.delete-upon-undeploy=true", "camunda.bpm.application.scan-for-process-definitions=false",
  "camunda.bpm.application.deploy-changed-only=true", "camunda.bpm.application.resume-previous-versions=true"})
public class ApplicationPropertiesTest extends ParsePropertiesHelper {

  @Test
  public void verifyCorrectProperties() throws Exception {

    assertThat(application.isDeleteUponUndeploy()).isEqualTo(true);
    assertThat(application.isScanForProcessDefinitions()).isEqualTo(false);
    assertThat(application.isDeployChangedOnly()).isEqualTo(true);
    assertThat(application.isResumePreviousVersions()).isEqualTo(true);
  }
}
