package org.camunda.bpm.spring.boot.starter.property;

import org.camunda.bpm.engine.repository.ResumePreviousBy;

import java.util.HashMap;
import java.util.Map;

import static org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml.PROP_IS_DELETE_UPON_UNDEPLOY;
import static org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml.PROP_IS_DEPLOY_CHANGED_ONLY;
import static org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml.PROP_IS_RESUME_PREVIOUS_VERSIONS;
import static org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml.PROP_IS_SCAN_FOR_PROCESS_DEFINITIONS;
import static org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml.PROP_RESUME_PREVIOUS_BY;
import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.joinOn;

public class ApplicationProperty {

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
   * this property is not set, the default value is used: false.
   */
  private boolean isResumePreviousVersions = false;

  /**
   * Indicates which previous deployments should be resumed by this
   * deployment. Can be any of the options in {@link ResumePreviousBy}.
   */
  private String resumePreviousBy = ResumePreviousBy.RESUME_BY_PROCESS_DEFINITION_KEY;

  /**
   * Gets the flag that indicates whether the undeployment of the process archive should trigger
   * deleting the process engine deployment. If the process engine deployment is deleted, all
   * running and historic process instances are removed as well.
   *
   * @return {@code true} if the undeployment of the process archive should trigger deleting the
   * process engine deployment; otherwise {@code false}
   */
  public boolean isDeleteUponUndeploy() {
    return isDeleteUponUndeploy;
  }

  /**
   * Sets the flag that indicates whether the undeployment of the process archive should trigger
   * deleting the process engine deployment. If the process engine deployment is deleted, all
   * running and historic process instances are removed as well.
   *
   * @param isDeleteUponUndeploy flag to indicate whether the undeployment of the process engine
   *                             should trigger deleting the process engine deployment ({@code true}) or not
   *                             ({@code false})
   */
  public void setDeleteUponUndeploy(boolean isDeleteUponUndeploy) {
    this.isDeleteUponUndeploy = isDeleteUponUndeploy;
  }

  /**
   * Gets the flag that indicates if the classloader should be scanned for process definitions.
   *
   * @return {@code true} if the classloader should be scanned for process definitions; otherwise
   * {@code flase}
   */
  public boolean isScanForProcessDefinitions() {
    return isScanForProcessDefinitions;
  }

  /**
   * Sets the flag that indicates whether the classloader should be scanned for process definitions.
   *
   * @param isScanForProcessDefinitions flag to indicate if the classloader should be scanned for
   *                                    process definitions ({@code true}) or not ({@code false})
   */
  public void setScanForProcessDefinitions(boolean isScanForProcessDefinitions) {
    this.isScanForProcessDefinitions = isScanForProcessDefinitions;
  }

  /**
   * Gets the flag that indicates whether only changed resources should be part of the deployment.
   * This is independent of the setting that if no resources change, no deployment takes place but
   * the previous deployment is resumed.
   *
   * @return {@code true} if only changed resources should be part of the deployment; otherwise
   * {@code false}
   */
  public boolean isDeployChangedOnly() {
    return isDeployChangedOnly;
  }

  /**
   * Sets the flag that indicates whether only changed resources should be part of the deployment.
   * This is independent of the setting that if no resources change, no deployment takes place but
   * the previous deployment is resumed.
   *
   * @param isDeployChangedOnly the flag that indicates whether only changed resources should be
   *                            part of the deployment ({@code true}) or not {@code false})
   */
  public void setDeployChangedOnly(boolean isDeployChangedOnly) {
    this.isDeployChangedOnly = isDeployChangedOnly;
  }

  /**
   * Gets the flag that indicates whether old versions of the deployment should be resumed. If this
   * property is not set, the default value is used: true.
   *
   * @return the flag that indicates whether old versions of the deployment should be resumed ({@code
   * true}) or not ({@code false})
   */
  public boolean isResumePreviousVersions() {
    return isResumePreviousVersions;
  }

  /**
   * Sets the flag that indicates whether old versions of the deployment should be resumed. If this
   * property is not set, the default value is used: true.
   *
   * @param isResumePreviousVersions the flag that indicates whether old versions of the deployment
   *                                 should be resumed ({@code true}) or not ({@code false})
   */
  public void setResumePreviousVersions(boolean isResumePreviousVersions) {
    this.isResumePreviousVersions = isResumePreviousVersions;
  }

  /**
   * Gets the value that indicates which previous deployments should be resumed by this deployment.
   * Can be any of the options in {@link ResumePreviousBy}.
   *
   * @return the value that indicates which previous deployments should be resumed by this
   * deployment
   */
  public String getResumePreviousBy() {
    return resumePreviousBy;
  }

  /**
   * Sets the value that indicates which previous deployments should be resumed by this deployment.
   * Can be any of the options in {@link ResumePreviousBy}.
   *
   * @param resumePreviousBy the value that indicates which previous deployments should be resumed
   *                         by this deployment
   */
  public void setResumePreviousBy(String resumePreviousBy) {
    this.resumePreviousBy = resumePreviousBy;
  }

  public Map<String,String> toMap() {

    final Map<String, String> properties = new HashMap();
    properties.put(PROP_IS_DELETE_UPON_UNDEPLOY, String.valueOf(isDeleteUponUndeploy));
    properties.put(PROP_IS_SCAN_FOR_PROCESS_DEFINITIONS, String.valueOf(isScanForProcessDefinitions));
    properties.put(PROP_IS_DEPLOY_CHANGED_ONLY, String.valueOf(isDeployChangedOnly));
    properties.put(PROP_IS_RESUME_PREVIOUS_VERSIONS, String.valueOf(isResumePreviousVersions));
    properties.put(PROP_RESUME_PREVIOUS_BY, resumePreviousBy);

    return properties;
  }

  @Override
  public String toString() {
    return joinOn(this.getClass())
      .add("properties=" + toMap())
      .toString();
  }

}
