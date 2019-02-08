/*
 * Copyright © 2015-2019 camunda services GmbH and various authors (info@camunda.com)
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

import org.camunda.bpm.engine.identity.User;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@TestPropertySource(properties = {
  "camunda.bpm.eventing.execution=false",
  "camunda.bpm.eventing.task=false",
  "camunda.bpm.eventing.history=false"})
public class EventingPropertyTest extends ParsePropertiesHelper {

  @Test
  public void shouldLoadProperties() {
    assertThat(properties.getEventing().isExecution()).isFalse();
    assertThat(properties.getEventing().isTask()).isFalse();
    assertThat(properties.getEventing().isHistory()).isFalse();
  }

}
