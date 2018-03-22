package org.camunda.bpm.spring.boot.starter.container;

import org.camunda.bpm.application.AbstractProcessApplication;
import org.camunda.bpm.application.impl.metadata.ProcessArchiveXmlImpl;
import org.camunda.bpm.application.impl.metadata.ProcessesXmlImpl;
import org.camunda.bpm.application.impl.metadata.spi.ProcessesXml;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;

import java.util.Collections;
import java.util.function.BiFunction;

/**
 * BiFunction that creates a valid {@link ProcessesXml} instance based on information from {@link CamundaBpmProperties}
 * and {@link org.camunda.bpm.spring.boot.starter.SpringBootProcessApplication}.
 */
public class CreateProcessesXmlFromProperties implements BiFunction<AbstractProcessApplication, CamundaBpmProperties, ProcessesXml> {

  @Override
  public ProcessesXml apply(final AbstractProcessApplication processApplication, final CamundaBpmProperties properties) {
    final ProcessArchiveXmlImpl archive = new ProcessArchiveXmlImpl();
    archive.setProcessResourceNames(Collections.emptyList());
    archive.setProperties(properties.getApplication().toMap());

    archive.setProcessEngineName(properties.getProcessEngineName());
    archive.setName(processApplication.getName());

    return new ProcessesXmlImpl(Collections.emptyList(), Collections.singletonList(archive));
  }
}
