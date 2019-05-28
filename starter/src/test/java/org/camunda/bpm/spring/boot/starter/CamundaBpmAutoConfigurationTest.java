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

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.spring.ProcessEngineFactoryBean;
import org.junit.Test;
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

public class CamundaBpmAutoConfigurationTest {

  private final ApplicationContextRunner contextRunner = new ApplicationContextRunner()
    .withConfiguration(AutoConfigurations.of(CamundaBpmAutoConfiguration.class, RequiredTestConfiguration.class));

  @Test
  public void testAutoConfiguration() {
    this.contextRunner
      .run(context -> assertThat(context)
        .hasSingleBean(ProcessEngineFactoryBean.class)
        .hasSingleBean(ProcessEngine.class));
  }

  @Test
  public void testAutoConfigurationWithCustomProcessEngine() {
    this.contextRunner
      .withUserConfiguration(CustomProcessEngineConfiguration.class)
      .run(context -> assertThat(context)
        .doesNotHaveBean(ProcessEngineFactoryBean.class)
        .hasSingleBean(ProcessEngine.class)
        .getBean(ProcessEngine.class)
        .isSameAs(context.getBean(CustomProcessEngineConfiguration.class).processEngine()));
  }

  @TestConfiguration
  static class RequiredTestConfiguration {
    @Bean
    PlatformTransactionManager platformTransactionManager() {
      return new DataSourceTransactionManager(dataSource());
    }

    @Bean
    DataSource dataSource() {
      return new EmbeddedDatabaseBuilder()
        .setType(EmbeddedDatabaseType.H2)
        .build();
    }
  }

  @TestConfiguration
  static class CustomProcessEngineConfiguration {
    @Bean
    ProcessEngine processEngine() {
      return mock(ProcessEngine.class);
    }
  }
}
