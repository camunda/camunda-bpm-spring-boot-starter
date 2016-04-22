package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.impl.metrics.MetricsRegistry;
import org.camunda.bpm.engine.impl.metrics.MetricsReporterIdProvider;
import org.camunda.bpm.engine.impl.metrics.reporter.DbMetricsReporter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("camunda.bpm")
public class CamundaBpmProperties {

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
  private String[] deploymentResourcePattern = new String[]{"classpath*:**/*.bpmn", "classpath*:**/*.bpmn20.xml", "classpath*:**/*.cmmn",
    "classpath*:**/*.cmmn10.xml"};

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
   * metrics configuration
   */
  private Metrics metrics = new Metrics();

  /**
   * rest configuration
   */
  private Rest rest = new Rest();

  /**
   * webapp configuration
   */
  private Webapp webapp = new Webapp();

  /**
   * @return the database
   */
  public Database getDatabase() {
    return database;
  }

  /**
   * @param database the database to set
   */
  public void setDatabase(Database database) {
    this.database = database;
  }

  /**
   * @return the jpa
   */
  public Jpa getJpa() {
    return jpa;
  }

  /**
   * @param jpa the jpa to set
   */
  public void setJpa(Jpa jpa) {
    this.jpa = jpa;
  }

  /**
   * @return the jobExecution
   */
  public JobExecution getJobExecution() {
    return jobExecution;
  }

  /**
   * @param jobExecution the jobExecution to set
   */
  public void setJobExecution(JobExecution jobExecution) {
    this.jobExecution = jobExecution;
  }

  public Webapp getWebapp() {
    return webapp;
  }

  public void setWebapp(Webapp webapp) {
    this.webapp = webapp;
  }

  /**
   * @return the processEngineName
   */
  public String getProcessEngineName() {
    return processEngineName;
  }

  /**
   * @param processEngineName the processEngineName to set
   */
  public void setProcessEngineName(String processEngineName) {
    this.processEngineName = processEngineName;
  }

  public void setHistoryLevel(String historyLevel) {
    this.historyLevel = historyLevel;
  }

  public String getHistoryLevel() {
    return historyLevel;
  }

  /**
   * @return the historyLevelDefault
   */
  public String getHistoryLevelDefault() {
    return historyLevelDefault;
  }

  /**
   * @param historyLevelDefault the historyLevelDefault to set
   */
  public void setHistoryLevelDefault(String historyLevelDefault) {
    this.historyLevelDefault = historyLevelDefault;
  }

  /**
   * @return the autoDeploymentEnabled
   */
  public boolean isAutoDeploymentEnabled() {
    return autoDeploymentEnabled;
  }

  /**
   * @param autoDeploymentEnabled the autoDeploymentEnabled to set
   */
  public void setAutoDeploymentEnabled(boolean autoDeploymentEnabled) {
    this.autoDeploymentEnabled = autoDeploymentEnabled;
  }

  /**
   * @return the deploymentResourcePattern
   */
  public String[] getDeploymentResourcePattern() {
    return deploymentResourcePattern;
  }

  /**
   * @param deploymentResourcePattern the deploymentResourcePattern to set
   */
  public void setDeploymentResourcePattern(String[] deploymentResourcePattern) {
    this.deploymentResourcePattern = deploymentResourcePattern;
  }

  /**
   * @return the rest
   */
  public Rest getRest() {
    return rest;
  }

  /**
   * @param rest the rest to set
   */
  public void setRest(Rest rest) {
    this.rest = rest;
  }


  public Metrics getMetrics() {
    return metrics;
  }

  public void setMetrics(Metrics metrics) {
    this.metrics = metrics;
  }


  public static class Database {
    /**
     * enables automatic schema update
     */
    private boolean schemaUpdate = true;

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
    public boolean isSchemaUpdate() {
      return schemaUpdate;
    }

    /**
     * @param schemaUpdate the schemaUpdate to set
     */
    public void setSchemaUpdate(boolean schemaUpdate) {
      this.schemaUpdate = schemaUpdate;
    }

    /**
     * @return the type
     */
    public String getType() {
      return type;
    }

    /**
     * @param type the type to set
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
     * @param tablePrefix the tablePrefix to set
     */
    public void setTablePrefix(String tablePrefix) {
      this.tablePrefix = tablePrefix;
    }

  }

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

    /**
     * @return the enabled
     */
    public boolean isEnabled() {
      return enabled;
    }

    /**
     * @param enabled the enabled to set
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
     * @param active the active to set
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
     * @param deploymentAware the deploymentAware to set
     */
    public void setDeploymentAware(boolean deploymentAware) {
      this.deploymentAware = deploymentAware;
    }

  }

  public static class Rest {

    /**
     * enables rest services
     */
    private boolean enabled = true;
    private String mappedUrl = "/rest/*";

    /**
     * @return the enabled
     */
    public boolean isEnabled() {
      return enabled;
    }

    /**
     * @param enabled the enabled to set
     */
    public void setEnabled(boolean enabled) {
      this.enabled = enabled;
    }

    public String getMappedUrl() {
      return mappedUrl;
    }

    public void setMappedUrl(String mappedUrl) {
      if (mappedUrl == null || mappedUrl.equals("/")) {
        mappedUrl = "/*";
      }

      if (!mappedUrl.startsWith("/")) {
        mappedUrl = "/" + mappedUrl;
      }

      if (mappedUrl.equals("/")) {
        mappedUrl = "/*";
      } else {
        mappedUrl += "/*";
      }

      this.mappedUrl = mappedUrl;
    }
  }

  public static class Metrics {

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

    /**
     * @return the enabled
     */
    public boolean isEnabled() {
      return enabled;
    }

    /**
     * @param enabled the enabled to set
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
     * @param persistenceUnitName the persistenceUnitName to set
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
     * @param closeEntityManager the closeEntityManager to set
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
     * @param handleTransaction the handleTransaction to set
     */
    public void setHandleTransaction(boolean handleTransaction) {
      this.handleTransaction = handleTransaction;
    }

  }

  public static class Webapp {
    private boolean indexRedirectEnabled = true;

    public boolean isIndexRedirectEnabled() {
      return indexRedirectEnabled;
    }

    public void setIndexRedirectEnabled(boolean indexRedirectEnabled) {
      this.indexRedirectEnabled = indexRedirectEnabled;
    }

  }
}
