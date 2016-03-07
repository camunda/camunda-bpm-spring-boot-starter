package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDatasourceConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaDeploymentConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaHistoryConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaHistoryLevelAutoHandlingConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaJobConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaJpaConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.CamundaProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.condition.NeedsHistoryAutoConfigurationCondition;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultDatasourceConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultDeploymentConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultHistoryConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultHistoryLevelAutoHandlingConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultJobConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultJobConfiguration.JobConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultJpaConfiguration;
import org.camunda.bpm.spring.boot.starter.configuration.impl.DefaultProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.jdbc.HistoryLevelDeterminator;
import org.camunda.bpm.spring.boot.starter.jdbc.HistoryLevelDeterminatorJdbcTemplateImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@Import(JobConfiguration.class)
public class CamundaBpmConfiguration {

  private final Logger logger = LoggerFactory.getLogger(CamundaBpmConfiguration.class);

  @Autowired
  protected List<CamundaConfiguration> camundaConfigurations;

  @Bean
  @ConditionalOnMissingBean(ProcessEngineConfigurationImpl.class)
  public ProcessEngineConfigurationImpl processEngineConfigurationImpl() {
    SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();

    for (CamundaConfiguration camundaConfiguration : camundaConfigurations) {
      logger.debug("applying {}", camundaConfiguration.getClass());
      camundaConfiguration.apply(configuration);
    }

    return configuration;
  }

  @Bean
  @ConditionalOnMissingBean(CamundaProcessEngineConfiguration.class)
  public static CamundaProcessEngineConfiguration camundaProcessEngineConfiguration() {
    return new DefaultProcessEngineConfiguration();
  }

  @Bean
  @ConditionalOnMissingBean(CamundaDatasourceConfiguration.class)
  public static CamundaDatasourceConfiguration camundaDatasourceConfiguration() {
    return new DefaultDatasourceConfiguration();
  }

  @Bean
  @ConditionalOnBean(name = "entityManagerFactory")
  @ConditionalOnMissingBean(CamundaJpaConfiguration.class)
  @ConditionalOnProperty(prefix = "camunda.bpm.jpa", name = "enabled", havingValue = "true", matchIfMissing = true)
  public static CamundaJpaConfiguration camundaJpaConfiguration() {
    return new DefaultJpaConfiguration();
  }

  @Bean
  @ConditionalOnMissingBean(CamundaJobConfiguration.class)
  @ConditionalOnProperty(prefix = "camunda.bpm.job-execution", name = "enabled", havingValue = "true", matchIfMissing = true)
  public static CamundaJobConfiguration camundaJobConfiguration() {
    return new DefaultJobConfiguration();
  }

  @Bean
  @ConditionalOnMissingBean(CamundaHistoryConfiguration.class)
  public static CamundaHistoryConfiguration camundaHistoryConfiguration() {
    return new DefaultHistoryConfiguration();
  }

  @Bean(name = "historyLevelAutoConfiguration")
  @ConditionalOnMissingBean(CamundaHistoryLevelAutoHandlingConfiguration.class)
  @ConditionalOnProperty(prefix = "camunda.bpm", name = "history-level", havingValue = "auto", matchIfMissing = false)
  @Conditional(NeedsHistoryAutoConfigurationCondition.class)
  public static CamundaHistoryLevelAutoHandlingConfiguration historyLevelAutoHandlingConfiguration() {
    return new DefaultHistoryLevelAutoHandlingConfiguration();
  }

  @Bean(name = "historyLevelDeterminator")
  @ConditionalOnMissingBean(name = { "camundaBpmJdbcTemplate", "historyLevelDeterminator" })
  @ConditionalOnBean(name = "historyLevelAutoConfiguration")
  public static HistoryLevelDeterminator historyLevelDeterminator(CamundaBpmProperties camundaBpmProperties, JdbcTemplate jdbcTemplate) {
    return createHistoryLevelDeterminator(camundaBpmProperties, jdbcTemplate);
  }

  @Bean(name = "historyLevelDeterminator")
  @ConditionalOnBean(name = { "camundaBpmJdbcTemplate", "historyLevelAutoConfiguration", "historyLevelDeterminator" })
  @ConditionalOnMissingBean(name = "historyLevelDeterminator")
  public static HistoryLevelDeterminator historyLevelDeterminatorMultiDatabase(CamundaBpmProperties camundaBpmProperties,
      @Qualifier("camundaBpmJdbcTemplate") JdbcTemplate jdbcTemplate) {
    return createHistoryLevelDeterminator(camundaBpmProperties, jdbcTemplate);
  }

  private static HistoryLevelDeterminator createHistoryLevelDeterminator(CamundaBpmProperties camundaBpmProperties, JdbcTemplate jdbcTemplate) {
    final HistoryLevelDeterminatorJdbcTemplateImpl determinator = new HistoryLevelDeterminatorJdbcTemplateImpl();
    determinator.setCamundaBpmProperties(camundaBpmProperties);
    determinator.setJdbcTemplate(jdbcTemplate);
    return determinator;
  }

  @Bean
  @ConditionalOnMissingBean(CamundaDeploymentConfiguration.class)
  public static CamundaDeploymentConfiguration camundaDeploymentConfiguration() {
    return new DefaultDeploymentConfiguration();
  }
}
