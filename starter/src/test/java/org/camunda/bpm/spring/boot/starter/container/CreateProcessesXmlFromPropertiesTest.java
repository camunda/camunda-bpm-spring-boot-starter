package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.application.AbstractProcessApplication;
import org.camunda.bpm.application.impl.metadata.ProcessArchiveXmlImpl;
import org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml;
import org.camunda.bpm.application.impl.metadata.spi.ProcessesXml;
import org.camunda.bpm.engine.repository.ResumePreviousBy;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CreateProcessesXmlFromPropertiesTest {

  public static final String PROCESS_APPLICATION_NAME = "testApplication";

  private final CamundaBpmProperties properties = new CamundaBpmProperties();
  private final AbstractProcessApplication processApplication = mock(AbstractProcessApplication.class);

  private final CreateProcessesXmlFromProperties function = new CreateProcessesXmlFromProperties();

  @Before
  public void setUp() {
    when(processApplication.getName()).thenReturn(PROCESS_APPLICATION_NAME);
  }

  @Test
  public void createSingleArchiveWithDefaults() {
    ProcessesXml processesXml= function.apply(processApplication, properties);

    assertThat(processesXml.getProcessEngines()).isEmpty();
    assertThat(processesXml.getProcessArchives()).hasSize(1);
    ProcessArchiveXmlImpl processArchiveXml = (ProcessArchiveXmlImpl) processesXml.getProcessArchives().get(0);

    assertThat(processArchiveXml.getName()).isEqualTo(PROCESS_APPLICATION_NAME);
    assertThat(processArchiveXml.getProcessEngineName()).isEqualTo("default");
    assertThat(processArchiveXml.getProcessResourceNames()).isEmpty();
    assertThat(processArchiveXml.getProperties())
      .containsEntry(ProcessArchiveXml.PROP_IS_DELETE_UPON_UNDEPLOY, "false")
      .containsEntry(ProcessArchiveXml.PROP_IS_DEPLOY_CHANGED_ONLY, "false")
      .containsEntry(ProcessArchiveXml.PROP_IS_SCAN_FOR_PROCESS_DEFINITIONS, "true")
      .containsEntry(ProcessArchiveXml.PROP_IS_RESUME_PREVIOUS_VERSIONS, "false")
      .containsEntry(ProcessArchiveXml.PROP_RESUME_PREVIOUS_BY, ResumePreviousBy.RESUME_BY_PROCESS_DEFINITION_KEY);

  }
}
