package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.interceptor.CommandExecutor;
import org.camunda.bpm.engine.spring.ProcessEngineFactoryBean;
import org.camunda.bpm.spring.boot.starter.event.ProcessApplicationEventPublisher;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;

@EnableConfigurationProperties({ CamundaBpmProperties.class, CamundaBpmManagementProperties.class })
@Import({ CamundaBpmConfiguration.class, CamundaBpmActuatorConfiguration.class, CamundaBpmPluginsConfiguration.class,
    ExportingProcessEngineServicesConfiguration.class })
@AutoConfigureAfter(HibernateJpaAutoConfiguration.class)
public class CamundaBpmAutoConfiguration {

  @Bean
  public ProcessEngineFactoryBean processEngineFactoryBean(final ProcessEngineConfigurationImpl processEngineConfigurationImpl) {
    final ProcessEngineFactoryBean factoryBean = new ProcessEngineFactoryBean();
    factoryBean.setProcessEngineConfiguration(processEngineConfigurationImpl);

    return factoryBean;
  }

  @Bean
  @Primary
  public CommandExecutor commandExecutorTxRequired(final ProcessEngineConfigurationImpl processEngineConfiguration) {
    return processEngineConfiguration.getCommandExecutorTxRequired();
  }

  @Bean
  public CommandExecutor commandExecutorTxRequiresNew(final ProcessEngineConfigurationImpl processEngineConfiguration) {
    return processEngineConfiguration.getCommandExecutorTxRequiresNew();
  }

  @Bean
  public CommandExecutor commandExecutorSchemaOperations(final ProcessEngineConfigurationImpl processEngineConfiguration) {
    return processEngineConfiguration.getCommandExecutorSchemaOperations();
  }

  @Bean
  public ProcessApplicationEventPublisher processApplicationEventPublisher(ApplicationEventPublisher publisher) {
    return new ProcessApplicationEventPublisher(publisher);
  }
}
