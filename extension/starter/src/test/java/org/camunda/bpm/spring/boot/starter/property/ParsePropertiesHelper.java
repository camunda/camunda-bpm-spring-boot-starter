package org.camunda.bpm.spring.boot.starter.property;

import javax.annotation.PostConstruct;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ParsePropertiesHelper.TestConfig.class)
public abstract class ParsePropertiesHelper {

  @EnableConfigurationProperties(CamundaBpmProperties.class)
  public static class TestConfig {
  }

  @Autowired
  protected CamundaBpmProperties properties;

  protected Metrics metrics;
  protected Application application;

  @PostConstruct
  public void init() {
    metrics = properties.getMetrics();
    application = properties.getApplication();
  }
}
