package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.container.RuntimeContainerDelegate;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;

public class RuntimeContainerConfiguration {


  /**
   * Creates {@link org.camunda.bpm.container.impl.RuntimeContainerDelegateImpl} for {@link org.springframework.boot.context.properties.ConfigurationProperties}.
   * <p/>
   * Registers container on {@link RuntimeContainerDelegate#INSTANCE}.
   *
   * @param initializeProcessesXmlFromApplicationPropertiesStep the step that creates processesXml from application properties
   * @return runtime container delegate
   */
  //TODO: make conditional: @ConditionalOnProperty(prefix = CamundaBpmProperties.PREFIX, name = "processesXmlFromProperties", matchIfMissing = true)
  @Bean
  public SpringBootRuntimeContainerDelegate springBootRuntimeContainerDelegate(final InitializeProcessesXmlFromApplicationPropertiesStep initializeProcessesXmlFromApplicationPropertiesStep) {
    final SpringBootRuntimeContainerDelegate runtimeContainerDelegate = new SpringBootRuntimeContainerDelegate(initializeProcessesXmlFromApplicationPropertiesStep);

    RuntimeContainerDelegate.INSTANCE.set(runtimeContainerDelegate);
    return runtimeContainerDelegate;
  }

  @Bean
  public CreateProcessesXmlFromProperties createProcessesXmlFromProperties() {
    return new CreateProcessesXmlFromProperties();
  }

  @Bean
  public InitializeProcessesXmlFromApplicationPropertiesStep initializeProcessesXmlFromApplicationPropertiesStep(
    final CamundaBpmProperties properties,
    final CreateProcessesXmlFromProperties createProcessesXmlFromProperties) {
    return new InitializeProcessesXmlFromApplicationPropertiesStep(properties, createProcessesXmlFromProperties);
  }
}
