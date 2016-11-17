package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.util.CamundaBpmVersion;
import org.junit.Test;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.test.util.ReflectionTestUtils;

import javax.sql.DataSource;
import java.net.URL;
import java.sql.Connection;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class EnterLicenseKeyConfigurationTest {

  @Test
  public void load_url_string() throws Exception {
    final URL licenseFileUrl = EnterLicenseKeyConfiguration.class.getClassLoader().getResource("camunda-license-dummy.txt");
    final String licenseKey = EnterLicenseKeyConfiguration
      .readLicenseKeyFromUrl(licenseFileUrl)
      .orElse(null);

    assertThat(licenseKey)
      .isNotNull()
      .startsWith("1234567890")
      .endsWith("Github;unlimited")
      .doesNotContain("\n");
  }


  @Test
  public void save_licenseKey() throws Exception {
    DataSource dataSource = new EmbeddedDatabaseBuilder()
      .setType(EmbeddedDatabaseType.H2)
      .addScript("/org/camunda/bpm/engine/db/create/activiti.h2.create.engine.sql")
      .build();

    final URL licenseFileUrl = EnterLicenseKeyConfiguration.class.getClassLoader().getResource("camunda-license-dummy.txt");

    ProcessEngine processEngine = mock(ProcessEngine.class);
    ProcessEngineConfigurationImpl configuration = mock(ProcessEngineConfigurationImpl.class);
    when(processEngine.getProcessEngineConfiguration()).thenReturn(configuration);
    when(configuration.getDataSource()).thenReturn(dataSource);
    CamundaBpmProperties properties = new CamundaBpmProperties();
    properties.setLicenseFile(licenseFileUrl);

    EnterLicenseKeyConfiguration enterLicenseKeyConfiguration = new EnterLicenseKeyConfiguration();

    ReflectionTestUtils.setField(enterLicenseKeyConfiguration, "camundaBpmProperties", properties);

    CamundaBpmVersion version = CamundaBpmVersion.INSTANCE;
    ReflectionTestUtils.setField(version, "version", Optional.of("123-ee"));

    enterLicenseKeyConfiguration.postProcessEngineBuild(processEngine);

    try (Connection connection = dataSource.getConnection()) {
      Optional<String> keyFromDatasource = EnterLicenseKeyConfiguration.readLicenseKeyFromDatasource(connection);

      assertThat(keyFromDatasource.get())
        .isNotNull()
        .startsWith("1234567890")
        .endsWith("Github;unlimited")
        .doesNotContain("\n");
    }

  }
}
