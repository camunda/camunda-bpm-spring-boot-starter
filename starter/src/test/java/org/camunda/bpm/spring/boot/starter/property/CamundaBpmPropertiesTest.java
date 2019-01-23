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

import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import static org.assertj.core.api.Assertions.assertThat;

public class CamundaBpmPropertiesTest {

  @Rule
  public final ExpectedException thrown = ExpectedException.none();

  @Test
  public void initResourcePatterns() {
    final String[] patterns = CamundaBpmProperties.initDeploymentResourcePattern();

    assertThat(patterns).hasSize(7);
    assertThat(patterns).containsOnly("classpath*:**/*.bpmn", "classpath*:**/*.bpmn20.xml", "classpath*:**/*.dmn", "classpath*:**/*.dmn11.xml",
      "classpath*:**/*.cmmn", "classpath*:**/*.cmmn10.xml", "classpath*:**/*.cmmn11.xml");
  }

  @Test
  public void application_defaults() throws Exception {
    assertThat(new CamundaBpmProperties().getApplication().isDeleteUponUndeploy()).isFalse();
  }

  @Test
  public void restrict_allowed_values_for_dbUpdate() {
    new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
    new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_FALSE);
    new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE);
    new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_CREATE_DROP);
    new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_DROP_CREATE);

    thrown.expect(IllegalArgumentException.class);
    thrown.expectMessage("foo");

    new CamundaBpmProperties().getDatabase().setSchemaUpdate("foo");
  }


}
