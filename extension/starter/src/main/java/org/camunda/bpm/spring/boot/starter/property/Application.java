package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;
import org.camunda.bpm.application.impl.metadata.ProcessArchiveXmlImpl;
import org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml;
import org.camunda.bpm.engine.repository.ResumePreviousBy;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Data
public class Application {
  /**
   * Indicates whether the undeployment of the process archive should trigger
   * deleting the process engine deployment. If the process engine deployment
   * is deleted, all running and historic process instances are removed as
   * well.
   */
  private boolean isDeleteUponUndeploy = false;

  /**
   * Indicates whether the classloader should be scanned for process
   * definitions.
   */
  private boolean isScanForProcessDefinitions = true;

  /**
   * Indicates whether only changed resources should be part of the
   * deployment. This is independent of the setting that if no resources
   * change, no deployment takes place but the previous deployment is resumed.
   */
  private boolean isDeployChangedOnly = false;

  /**
   * Indicates whether old versions of the deployment should be resumed. If
   * this property is not set, the default value is used: true.
   */
  private boolean isResumePreviousVersions = false;

  /**
   * Indicates which previous deployments should be resumed by this
   * deployment. Can be any of the options in {@link ResumePreviousBy}.
   */
  private String resumePreviousBy = ResumePreviousBy.RESUME_BY_PROCESS_DEFINITION_KEY;

  public List<ProcessArchiveXml> getProcessArchives() {
    List<ProcessArchiveXml> processArchives = new ArrayList<ProcessArchiveXml>();

    // add single PA
    ProcessArchiveXmlImpl pa = new ProcessArchiveXmlImpl();
    processArchives.add(pa);

    pa.setProcessResourceNames(Collections.<String>emptyList());

    // with default properties
    final HashMap<String, String> properties = new HashMap<String, String>();
    pa.setProperties(properties);
    properties.put(ProcessArchiveXml.PROP_IS_DELETE_UPON_UNDEPLOY, String.valueOf(isDeleteUponUndeploy));
    properties.put(ProcessArchiveXml.PROP_IS_SCAN_FOR_PROCESS_DEFINITIONS, String.valueOf(isScanForProcessDefinitions));
    properties.put(ProcessArchiveXml.PROP_IS_DEPLOY_CHANGED_ONLY, String.valueOf(isDeployChangedOnly));
    properties.put(ProcessArchiveXml.PROP_RESUME_PREVIOUS_BY, resumePreviousBy);

    return processArchives;
  }

}
