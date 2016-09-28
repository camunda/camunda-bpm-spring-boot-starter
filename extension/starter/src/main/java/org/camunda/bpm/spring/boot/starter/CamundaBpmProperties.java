package org.camunda.bpm.spring.boot.starter;

import static org.springframework.core.io.support.ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.camunda.bpm.application.impl.metadata.ProcessArchiveXmlImpl;
import org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.repository.ResumePreviousBy;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.generic.GenericProcessEngineProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import lombok.Data;

@ConfigurationProperties("camunda.bpm")
@Data
public class CamundaBpmProperties {

  public static final String[] DEFAULT_BPMN_RESOURCE_SUFFIXES = new String[] { "bpmn20.xml", "bpmn" };
  public static final String[] DEFAULT_CMMN_RESOURCE_SUFFIXES = new String[] { "cmmn11.xml", "cmmn10.xml", "cmmn" };
  public static final String[] DEFAULT_DMN_RESOURCE_SUFFIXES = new String[] { "dmn11.xml", "dmn" };

  public static final String PROPERTY_DEFAULT_SERIALIZATION_FORMAT = "default-serialization-format";
  public static final String PROPERTY_PROCESS_ENGINE_NAME = "process-engine-name";
  public static final String PROPERTY_HISTORY = "history";
  public static final String PROPERTY_DATABASE_SCHEMA_UPDATE = "database-schema-update";

  static String[] initDeploymentResourcePattern() {
    final Set<String> suffixes = new HashSet<String>();
    suffixes.addAll(Arrays.asList(DEFAULT_DMN_RESOURCE_SUFFIXES));
    suffixes.addAll(Arrays.asList(DEFAULT_BPMN_RESOURCE_SUFFIXES));
    suffixes.addAll(Arrays.asList(DEFAULT_CMMN_RESOURCE_SUFFIXES));

    final Set<String> patterns = new HashSet<String>();
    for (String suffix : suffixes) {
      patterns.add(String.format("%s**/*.%s", CLASSPATH_ALL_URL_PREFIX, suffix));
    }

    return patterns.toArray(new String[patterns.size()]);
  }

  /**
   * the default history level to use when 'historyLevel' is 'auto'
   */
  private String historyLevelDefault;

  /**
   * enables auto deployment of processes
   */
  private boolean autoDeploymentEnabled = true;

  /**
   * resource pattern for locating process sources
   */
  private String[] deploymentResourcePattern = initDeploymentResourcePattern();

  @NestedConfigurationProperty
  private final GenericProcessEngineProperties processEngineConfiguration = new GenericProcessEngineProperties();

  /**
   * metrics configuration
   */
  private Metrics metrics = new Metrics();

  /**
   * JPA configuration
   */
  private Jpa jpa = new Jpa(processEngineConfiguration);

  /**
   * job execution configuration
   */
  private JobExecution jobExecution = new JobExecution(processEngineConfiguration);

  /**
   * webapp configuration
   */
  private Webapp webapp = new Webapp();

  /**
   * process application/processes.xml configuration
   */
  private Application application = new Application();

  public CamundaBpmProperties() {
    Map<String, Object> properties = processEngineConfiguration.getProperties();
    List<String> filter = processEngineConfiguration.getPropertiesToFilter();
    properties.put(PROPERTY_PROCESS_ENGINE_NAME, ProcessEngines.NAME_DEFAULT);
    properties.put(PROPERTY_HISTORY, HistoryLevel.HISTORY_LEVEL_FULL.getName());
    properties.put(PROPERTY_DEFAULT_SERIALIZATION_FORMAT, new SpringProcessEngineConfiguration().getDefaultSerializationFormat());
    properties.put(PROPERTY_DATABASE_SCHEMA_UPDATE, ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
    filter.add(PROPERTY_PROCESS_ENGINE_NAME);
    filter.add(PROPERTY_DEFAULT_SERIALIZATION_FORMAT);
  }

  @Data
  public static class JobExecution {

    public static final String PROPERTY_JOB_EXECUTOR_ACTIVATE = "job-executor-activate";

    public JobExecution(GenericProcessEngineProperties genericProcessEngineProperties) {
      Map<String, Object> properties = genericProcessEngineProperties.getProperties();
      properties.put(PROPERTY_JOB_EXECUTOR_ACTIVATE, true);
    }

    /**
     * enables job execution
     */
    private boolean enabled;

  }

  @Data
  public static class Metrics {

    private boolean enabled = true;
    private boolean dbReporterActivate = true;
  }

  @Data
  public static class Jpa {

    public static final String PROPERTY_JPA_PERSISTENCE_UNIT_NAME = "jpa_persistence-unit-name";
    public static final String PROPERTY_JPA_HANDLE_TRANSACTION = "jpa_handle-transaction";
    public static final String PROPERTY_JPA_CLOSE_ENTITY_MANAGER = "jpa_close-entity-manager";

    public Jpa(GenericProcessEngineProperties processEngineConfiguration) {
      Map<String, Object> properties = processEngineConfiguration.getProperties();
      List<String> filter = processEngineConfiguration.getPropertiesToFilter();
      properties.put(PROPERTY_JPA_CLOSE_ENTITY_MANAGER, true);
      properties.put(PROPERTY_JPA_HANDLE_TRANSACTION, true);
      filter.add(PROPERTY_JPA_CLOSE_ENTITY_MANAGER);
      filter.add(PROPERTY_JPA_HANDLE_TRANSACTION);
      filter.add(PROPERTY_JPA_PERSISTENCE_UNIT_NAME);
    }

    /**
     * enables JPA
     */
    private boolean enabled;

  }

  @Data
  public static class Webapp {
    private boolean indexRedirectEnabled = true;
  }

  @Data
  public static class Application {
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

      pa.setProcessResourceNames(Collections.<String> emptyList());

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
}
