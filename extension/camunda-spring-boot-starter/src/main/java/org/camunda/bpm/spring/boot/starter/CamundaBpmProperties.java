package org.camunda.bpm.spring.boot.starter;

import static org.springframework.core.io.support.ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.camunda.bpm.application.impl.metadata.ProcessArchiveXmlImpl;
import org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.impl.bpmn.deployer.BpmnDeployer;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cmmn.deployer.CmmnDeployer;
import org.camunda.bpm.engine.impl.dmn.deployer.DmnDeployer;
import org.camunda.bpm.engine.impl.metrics.MetricsRegistry;
import org.camunda.bpm.engine.impl.metrics.MetricsReporterIdProvider;
import org.camunda.bpm.engine.impl.metrics.reporter.DbMetricsReporter;
import org.camunda.bpm.engine.repository.ResumePreviousBy;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.Assert;

@ConfigurationProperties("camunda.bpm")
public class CamundaBpmProperties {

  static String[] initDeploymentResourcePattern() {
    final Set<String> suffixes = new HashSet<String>();
    suffixes.addAll(Arrays.asList(DmnDeployer.DMN_RESOURCE_SUFFIXES));
    suffixes.addAll(Arrays.asList(BpmnDeployer.BPMN_RESOURCE_SUFFIXES));
    suffixes.addAll(Arrays.asList(CmmnDeployer.CMMN_RESOURCE_SUFFIXES));

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

  public String getProcessEngineName() {
    return processEngineName;
  }

  public void setProcessEngineName(String processEngineName) {
    this.processEngineName = processEngineName;
  }

  /**
   * the history level to use
   */
  private String historyLevel;

  public String getHistoryLevel() {
    return historyLevel;
  }

  public void setHistoryLevel(String historyLevel) {
    this.historyLevel = historyLevel;
  }

  /**
   * the default history level to use when 'historyLevel' is 'auto'
   */
  private String historyLevelDefault;

  public String getHistoryLevelDefault() {
    return historyLevelDefault;
  }

  public void setHistoryLevelDefault(String historyLevelDefault) {
    this.historyLevelDefault = historyLevelDefault;
  }

  /**
   * enables auto deployment of processes
   */
  private boolean autoDeploymentEnabled = true;

  public boolean isAutoDeploymentEnabled() {
    return autoDeploymentEnabled;
  }

  public void setAutoDeploymentEnabled(boolean autoDeploymentEnabled) {
    this.autoDeploymentEnabled = autoDeploymentEnabled;
  }

  /**
   * resource pattern for locating process sources
   */
  private String[] deploymentResourcePattern = initDeploymentResourcePattern();

  public String[] getDeploymentResourcePattern() {
    return deploymentResourcePattern;
  }

  public void setDeploymentResourcePattern(String[] deploymentResourcePattern) {
    this.deploymentResourcePattern = deploymentResourcePattern;
  }

  /**
   * metrics configuration
   */
  private Metrics metrics = new Metrics();

  public Metrics getMetrics() {
    return metrics;
  }

  public void setMetrics(Metrics metrics) {
    this.metrics = metrics;
  }

  /**
   * database configuration
   */
  private Database database = new Database();

  public Database getDatabase() {
    return database;
  }

  public void setDatabase(Database database) {
    this.database = database;
  }

  /**
   * JPA configuration
   */
  private Jpa jpa = new Jpa();

  public Jpa getJpa() {
    return jpa;
  }

  public void setJpa(Jpa jpa) {
    this.jpa = jpa;
  }

  /**
   * job execution configuration
   */
  private JobExecution jobExecution = new JobExecution();

  public JobExecution getJobExecution() {
    return jobExecution;
  }

  public void setJobExecution(JobExecution jobExecution) {
    this.jobExecution = jobExecution;
  }

  /**
   * webapp configuration
   */
  private Webapp webapp = new Webapp();

  public Webapp getWebapp() {
    return webapp;
  }

  public void setWebapp(Webapp webapp) {
    this.webapp = webapp;
  }

  /**
   * process application/processes.xml configuration
   */
  private Application application = new Application();

  public Application getApplication() {
    return application;
  }

  public void setApplication(Application application) {
    this.application = application;
  }

  static class NestedProperty {
    @Override
    public String toString() {
      return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
  }

  public static class Database extends NestedProperty {
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
     * @return the schemaUpdate
     */
    public String getSchemaUpdate() {
      return schemaUpdate;
    }

    /**
     * @param schemaUpdate
     *          the schemaUpdate to set
     */
    public void setSchemaUpdate(String schemaUpdate) {
      Assert.isTrue(SCHEMA_UPDATE_VALUES.contains(schemaUpdate), String.format("schemaUpdate: '%s' is not valid (%s)", schemaUpdate, SCHEMA_UPDATE_VALUES));
      this.schemaUpdate = schemaUpdate;
    }

    /**
     * @return the type
     */
    public String getType() {
      return type;
    }

    /**
     * @param type
     *          the type to set
     */
    public void setType(String type) {
      this.type = type;
    }

    /**
     * @return the tablePrefix
     */
    public String getTablePrefix() {
      return tablePrefix;
    }

    /**
     * @param tablePrefix
     *          the tablePrefix to set
     */
    public void setTablePrefix(String tablePrefix) {
      this.tablePrefix = tablePrefix;
    }

  }

  public static class JobExecution extends NestedProperty {

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

    /**
     * @return the enabled
     */
    public boolean isEnabled() {
      return enabled;
    }

    /**
     * @param enabled
     *          the enabled to set
     */
    public void setEnabled(boolean enabled) {
      this.enabled = enabled;
    }

    /**
     * @return the active
     */
    public boolean isActive() {
      return active;
    }

    /**
     * @param active
     *          the active to set
     */
    public void setActive(boolean active) {
      this.active = active;
    }

    /**
     * @return the deploymentAware
     */
    public boolean isDeploymentAware() {
      return deploymentAware;
    }

    /**
     * @param deploymentAware
     *          the deploymentAware to set
     */
    public void setDeploymentAware(boolean deploymentAware) {
      this.deploymentAware = deploymentAware;
    }

  }

  public static class Metrics extends NestedProperty {

    private boolean enabled = true;
    private MetricsRegistry metricsRegistry;
    private MetricsReporterIdProvider metricsReporterIdProvider;
    private DbMetricsReporter dbMetricsReporter;
    private boolean dbMetricsReporterActivate = true;

    public boolean isEnabled() {
      return enabled;
    }

    public void setEnabled(boolean enabled) {
      this.enabled = enabled;
    }

    public DbMetricsReporter getDbMetricsReporter() {
      return dbMetricsReporter;
    }

    public void setDbMetricsReporter(DbMetricsReporter dbMetricsReporter) {
      this.dbMetricsReporter = dbMetricsReporter;
    }

    public boolean isDbMetricsReporterActivate() {
      return dbMetricsReporterActivate;
    }

    public void setDbMetricsReporterActivate(boolean dbMetricsReporterActivate) {
      this.dbMetricsReporterActivate = dbMetricsReporterActivate;
    }

    public MetricsRegistry getMetricsRegistry() {
      return metricsRegistry;
    }

    public void setMetricsRegistry(MetricsRegistry metricsRegistry) {
      this.metricsRegistry = metricsRegistry;
    }

    public MetricsReporterIdProvider getMetricsReporterIdProvider() {
      return metricsReporterIdProvider;
    }

    public void setMetricsReporterIdProvider(MetricsReporterIdProvider metricsReporterIdProvider) {
      this.metricsReporterIdProvider = metricsReporterIdProvider;
    }
  }

  public static class Jpa extends NestedProperty {
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

    /**
     * @return the enabled
     */
    public boolean isEnabled() {
      return enabled;
    }

    /**
     * @param enabled
     *          the enabled to set
     */
    public void setEnabled(boolean enabled) {
      this.enabled = enabled;
    }

    /**
     * @return the persistenceUnitName
     */
    public String getPersistenceUnitName() {
      return persistenceUnitName;
    }

    /**
     * @param persistenceUnitName
     *          the persistenceUnitName to set
     */
    public void setPersistenceUnitName(String persistenceUnitName) {
      this.persistenceUnitName = persistenceUnitName;
    }

    /**
     * @return the closeEntityManager
     */
    public boolean isCloseEntityManager() {
      return closeEntityManager;
    }

    /**
     * @param closeEntityManager
     *          the closeEntityManager to set
     */
    public void setCloseEntityManager(boolean closeEntityManager) {
      this.closeEntityManager = closeEntityManager;
    }

    /**
     * @return the handleTransaction
     */
    public boolean isHandleTransaction() {
      return handleTransaction;
    }

    /**
     * @param handleTransaction
     *          the handleTransaction to set
     */
    public void setHandleTransaction(boolean handleTransaction) {
      this.handleTransaction = handleTransaction;
    }

  }

  public static class Webapp extends NestedProperty {
    private boolean indexRedirectEnabled = true;

    public boolean isIndexRedirectEnabled() {
      return indexRedirectEnabled;
    }

    public void setIndexRedirectEnabled(boolean indexRedirectEnabled) {
      this.indexRedirectEnabled = indexRedirectEnabled;
    }
  }

  public static class Application extends NestedProperty {
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

    public boolean isDeleteUponUndeploy() {
      return isDeleteUponUndeploy;
    }

    public void setDeleteUponUndeploy(boolean deleteUponUndeploy) {
      isDeleteUponUndeploy = deleteUponUndeploy;
    }

    public boolean isScanForProcessDefinitions() {
      return isScanForProcessDefinitions;
    }

    public void setScanForProcessDefinitions(boolean scanForProcessDefinitions) {
      isScanForProcessDefinitions = scanForProcessDefinitions;
    }

    public boolean isDeployChangedOnly() {
      return isDeployChangedOnly;
    }

    public void setDeployChangedOnly(boolean deployChangedOnly) {
      isDeployChangedOnly = deployChangedOnly;
    }

    public boolean isResumePreviousVersions() {
      return isResumePreviousVersions;
    }

    public void setResumePreviousVersions(boolean resumePreviousVersions) {
      isResumePreviousVersions = resumePreviousVersions;
    }

    public String getResumePreviousBy() {
      return resumePreviousBy;
    }

    public void setResumePreviousBy(String resumePreviousBy) {
      this.resumePreviousBy = resumePreviousBy;
    }

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

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
  }
}
