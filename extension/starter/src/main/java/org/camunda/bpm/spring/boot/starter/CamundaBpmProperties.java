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
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.repository.ResumePreviousBy;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.Assert;

import lombok.Data;
import lombok.Singular;

@ConfigurationProperties("camunda.bpm")
@Data
public class CamundaBpmProperties {

  public static final String[] DEFAULT_BPMN_RESOURCE_SUFFIXES = new String[] { "bpmn20.xml", "bpmn" };
  public static final String[] DEFAULT_CMMN_RESOURCE_SUFFIXES = new String[] { "cmmn11.xml", "cmmn10.xml", "cmmn" };
  public static final String[] DEFAULT_DMN_RESOURCE_SUFFIXES = new String[] { "dmn11.xml", "dmn" };

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
   * name of the process engine
   */
  private String processEngineName = ProcessEngines.NAME_DEFAULT;

  /**
   * the history level to use
   */
  private String historyLevel;

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

  /**
   * default serialization format to use
   */
  private String defaultSerializationFormat = new SpringProcessEngineConfiguration().getDefaultSerializationFormat();

  /**
   * metrics configuration
   */
  private Metrics metrics = new Metrics();

  /**
   * database configuration
   */
  private Database database = new Database();

  /**
   * JPA configuration
   */
  private Jpa jpa = new Jpa();

  /**
   * job execution configuration
   */
  private JobExecution jobExecution = new JobExecution();

  /**
   * webapp configuration
   */
  private Webapp webapp = new Webapp();

  /**
   * process application/processes.xml configuration
   */
  private Application application = new Application();

  private Authorization authorization = new Authorization();

  private GenericProperties genericProperties = new GenericProperties();

  @Data
  public static class Database {
    public static final List<String> SCHEMA_UPDATE_VALUES = Arrays.asList(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE,
        ProcessEngineConfiguration.DB_SCHEMA_UPDATE_FALSE, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE,
        ProcessEngineConfiguration.DB_SCHEMA_UPDATE_CREATE_DROP, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_DROP_CREATE);

    /**
     * enables automatic schema update
     */
    private String schemaUpdate = ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE;

    /**
     * the database type
     */
    private String type;

    /**
     * the database table prefix to use
     */
    private String tablePrefix;

    /**
     * @param schemaUpdate
     *          the schemaUpdate to set
     */
    public void setSchemaUpdate(String schemaUpdate) {
      Assert.isTrue(SCHEMA_UPDATE_VALUES.contains(schemaUpdate), String.format("schemaUpdate: '%s' is not valid (%s)", schemaUpdate, SCHEMA_UPDATE_VALUES));
      this.schemaUpdate = schemaUpdate;
    }
  }

  @Data
  public static class JobExecution {

    /**
     * enables job execution
     */
    private boolean enabled;

    /**
     * activate job execution
     */
    private boolean active = true;

    /**
     * if job execution is deployment aware
     */
    private boolean deploymentAware;

  }

  @Data
  public static class Metrics {

    private boolean enabled = true;
    private boolean dbReporterActivate = true;
  }

  @Data
  public static class Jpa {
    /**
     * enables JPA
     */
    private boolean enabled;

    /**
     * the JPA persistence unit name
     */
    private String persistenceUnitName;

    /**
     * close JPA entity manager
     */
    private boolean closeEntityManager = true;

    /**
     * handle transactions by JPA
     */
    private boolean handleTransaction = true;
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

  @Data
  public static class Authorization {

    /**
     * enables authorization
     */
    private boolean enabled = new SpringProcessEngineConfiguration().isAuthorizationEnabled();

    /**
     * enables authorization for custom code
     */
    private boolean enabledForCustomCode = new SpringProcessEngineConfiguration().isAuthorizationEnabledForCustomCode();

    private String authorizationCheckRevokes = new SpringProcessEngineConfiguration().getAuthorizationCheckRevokes();
  }

  @Data
  public static class GenericProperties {
    @Singular
    private Map<String, Object> properties = new HashMap<String, Object>();
    private boolean ignoreInvalidFields;
    private boolean ignoreUnknownFields;
  }

}
