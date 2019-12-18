/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
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
package org.camunda.bpm.spring.boot.starter;

import static org.assertj.core.api.Assertions.assertThat;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.history.handler.CompositeDbHistoryEventHandler;
import org.camunda.bpm.engine.impl.history.handler.CompositeHistoryEventHandler;
import org.camunda.bpm.engine.impl.history.handler.HistoryEventHandler;
import org.camunda.bpm.spring.boot.starter.event.PublishHistoryEventHandler;
import org.camunda.bpm.spring.boot.starter.test.nonpa.TestApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TestApplication.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CustomHistoryEventHandlersIT extends AbstractCamundaAutoConfigurationIT {

  @Test
  public void shouldUsePublishHistoryEventHandler() {
    // given
    ProcessEngineConfigurationImpl configuration = (ProcessEngineConfigurationImpl) processEngine
      .getProcessEngineConfiguration();

    // when
    HistoryEventHandler handler = configuration.getHistoryEventHandler();

    // then
    // the HistoryEventHandler is composite and multiple handlers are included recursively
    assertThat(handler).isInstanceOf(CompositeHistoryEventHandler.class);
    assertThat(handler).extracting("historyEventHandlers").first().asList()
        .flatExtracting(Object::getClass)
        .containsExactlyInAnyOrder(
          PublishHistoryEventHandler.class,
          CompositeDbHistoryEventHandler.class);
  }
}
