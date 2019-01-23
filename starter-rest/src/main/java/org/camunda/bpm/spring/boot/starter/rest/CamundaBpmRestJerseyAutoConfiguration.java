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
package org.camunda.bpm.spring.boot.starter.rest;

import org.camunda.bpm.engine.rest.impl.FetchAndLockContextListener;
import org.camunda.bpm.spring.boot.starter.CamundaBpmAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration;
import org.springframework.context.annotation.Bean;

@AutoConfigureBefore({ JerseyAutoConfiguration.class })
@AutoConfigureAfter({ CamundaBpmAutoConfiguration.class })
public class CamundaBpmRestJerseyAutoConfiguration {

  @Bean
  @ConditionalOnMissingBean(CamundaJerseyResourceConfig.class)
  public CamundaJerseyResourceConfig createRestConfig() {
    return new CamundaJerseyResourceConfig();
  }

  @Bean
  public FetchAndLockContextListener getFetchAndLockContextListener() {
    return new FetchAndLockContextListener();
  }

}
