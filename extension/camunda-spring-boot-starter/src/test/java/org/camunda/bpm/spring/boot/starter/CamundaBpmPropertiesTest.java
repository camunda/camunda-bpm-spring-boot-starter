package org.camunda.bpm.spring.boot.starter;

import static org.assertj.core.api.Assertions.assertThat;

import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.junit.Rule;
import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.ConfigFileApplicationContextInitializer;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.PostConstruct;

@RunWith(Enclosed.class)
public class CamundaBpmPropertiesTest {

  public static class Sanity {


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
      thrown.expect(IllegalArgumentException.class);
      thrown.expectMessage("foo");

      new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
      new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_FALSE);
      new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE);
      new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_CREATE_DROP);
      new CamundaBpmProperties().getDatabase().setSchemaUpdate(ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_DROP_CREATE);

      new CamundaBpmProperties().getDatabase().setSchemaUpdate("foo");
    }
  }

  @RunWith(SpringJUnit4ClassRunner.class)
  @ContextConfiguration(
    classes = ParsePropertiesTest.TestConfig.class
  )
  public static abstract class ParsePropertiesTest {

    @EnableConfigurationProperties(CamundaBpmProperties.class)
    public static class TestConfig {
    }

    @Autowired
    protected CamundaBpmProperties properties;

    protected CamundaBpmProperties.Metrics metrics;
    protected CamundaBpmProperties.Application application;

    @PostConstruct
    public void init() {
      metrics = properties.getMetrics();
      application = properties.getApplication();
    }
  }

  @TestPropertySource(properties = {
    "camunda.bpm.metrics.enabled=false",
    "camunda.bpm.metrics.db-reporter-activate=false"
  })
  public static class MetricsPropertiesTest extends ParsePropertiesTest {

    @Test
    public void verifyCorrectProperties() throws Exception {
      assertThat(metrics.isEnabled()).isFalse();
      assertThat(metrics.isDbReporterActivate()).isFalse();
    }
  }

  @TestPropertySource(properties = {
    "camunda.bpm.application.delete-upon-undeploy=true",
    "camunda.bpm.application.scan-for-process-definitions=false",
    "camunda.bpm.application.deploy-changed-only=true",
    "camunda.bpm.application.resume-previous-versions=true"
  })
  public static class ApplicationPropertiesTest extends ParsePropertiesTest {

    @Test
    public void verifyCorrectProperties() throws Exception {

      assertThat(application.isDeleteUponUndeploy()).isEqualTo(true);
      assertThat(application.isScanForProcessDefinitions()).isEqualTo(false);
      assertThat(application.isDeployChangedOnly()).isEqualTo(true);
      assertThat(application.isResumePreviousVersions()).isEqualTo(true);
    }
  }

}
