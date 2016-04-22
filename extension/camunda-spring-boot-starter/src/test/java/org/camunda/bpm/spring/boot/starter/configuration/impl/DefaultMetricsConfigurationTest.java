package org.camunda.bpm.spring.boot.starter.configuration.impl;

import org.camunda.bpm.engine.impl.metrics.MetricsRegistry;
import org.camunda.bpm.engine.impl.metrics.MetricsReporterIdProvider;
import org.camunda.bpm.engine.impl.metrics.reporter.DbMetricsReporter;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.junit.Before;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;

public class DefaultMetricsConfigurationTest {
  private DefaultMetricsConfiguration defaultMetricsConfiguration = new DefaultMetricsConfiguration();
  private CamundaBpmProperties camundaBpmProperties = new CamundaBpmProperties();
  private SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();

  @Before
  public void setUp() {
    ReflectionTestUtils.setField(defaultMetricsConfiguration, "camundaBpmProperties", camundaBpmProperties);
    defaultMetricsConfiguration.init();

    ReflectionTestUtils.invokeMethod(configuration, "initMetrics");
  }

  @Test
  public void enabled() {
    assertThat(configuration.isMetricsEnabled()).isTrue();
    assertThat(camundaBpmProperties.getMetrics().isEnabled()).isTrue();

    camundaBpmProperties.getMetrics().setEnabled(false);
    defaultMetricsConfiguration.apply(configuration);
    assertThat(configuration.isMetricsEnabled()).isFalse();

    camundaBpmProperties.getMetrics().setEnabled(true);
    defaultMetricsConfiguration.apply(configuration);
    assertThat(configuration.isMetricsEnabled()).isTrue();
  }

  @Test
  public void metricsRegistry() {
    assertThat(configuration.getMetricsRegistry()).isNotNull();
    assertThat(camundaBpmProperties.getMetrics().getMetricsRegistry()).isNull();

    MetricsRegistry registry = mock(MetricsRegistry.class);
    camundaBpmProperties.getMetrics().setMetricsRegistry(registry);

    defaultMetricsConfiguration.apply(configuration);

    assertThat(configuration.getMetricsRegistry()).isEqualTo(registry);

    camundaBpmProperties.getMetrics().setMetricsRegistry(null);
    defaultMetricsConfiguration.apply(configuration);

    assertThat(configuration.getMetricsRegistry()).isEqualTo(registry);
  }


  @Test
  public void metricsReporterIdProvider() {

    assertThat(configuration.getMetricsReporterIdProvider()).isNotNull();
    assertThat(camundaBpmProperties.getMetrics().getMetricsReporterIdProvider()).isNull();

    MetricsReporterIdProvider provider = mock(MetricsReporterIdProvider.class);
    camundaBpmProperties.getMetrics().setMetricsReporterIdProvider(provider);

    defaultMetricsConfiguration.apply(configuration);

    assertThat(configuration.getMetricsReporterIdProvider()).isEqualTo(provider);

    camundaBpmProperties.getMetrics().setMetricsReporterIdProvider(null);
    defaultMetricsConfiguration.apply(configuration);

    assertThat(configuration.getMetricsReporterIdProvider()).isEqualTo(provider);
  }


  @Test
  public void dbMetricsReporter() {

    assertThat(configuration.getDbMetricsReporter()).isNotNull();
    assertThat(camundaBpmProperties.getMetrics().getDbMetricsReporter()).isNull();

    DbMetricsReporter reporter = mock(DbMetricsReporter.class);
    camundaBpmProperties.getMetrics().setDbMetricsReporter(reporter);

    defaultMetricsConfiguration.apply(configuration);

    assertThat(configuration.getDbMetricsReporter()).isEqualTo(reporter);

    camundaBpmProperties.getMetrics().setDbMetricsReporter(null);
    defaultMetricsConfiguration.apply(configuration);

    assertThat(configuration.getDbMetricsReporter()).isEqualTo(reporter);
  }

  @Test
  public void dbMetricsReporterActivate() {
    assertThat(configuration.isDbMetricsReporterActivate()).isTrue();
    assertThat(camundaBpmProperties.getMetrics().isDbMetricsReporterActivate()).isTrue();

    camundaBpmProperties.getMetrics().setDbMetricsReporterActivate(false);
    defaultMetricsConfiguration.apply(configuration);
    assertThat(configuration.isDbMetricsReporterActivate()).isFalse();

    camundaBpmProperties.getMetrics().setDbMetricsReporterActivate(true);
    defaultMetricsConfiguration.apply(configuration);
    assertThat(configuration.isDbMetricsReporterActivate()).isTrue();
  }
}
