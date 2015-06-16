package com.profi.spring.boot.starter.camunda;

import org.apache.commons.lang.StringUtils;
import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("camunda.bpm")
public class CamundaBpmProperties {

    protected static final HistoryLevel[] HISTORY_LEVELS = {
            HistoryLevel.HISTORY_LEVEL_ACTIVITY, HistoryLevel.HISTORY_LEVEL_AUDIT,
            HistoryLevel.HISTORY_LEVEL_FULL, HistoryLevel.HISTORY_LEVEL_NONE };

    private String processEngineName;

    private boolean jobExecutorActive = true;

    private boolean jobExecutorDeploymentAware;

    private boolean schemaUpdate = true;

    private String databaseType;

    private String databaseTablePrefix;

    private HistoryLevel historyLevel;

    private boolean autoDeploymentEnabled = true;

    private String deploymentResourcePattern = "classpath*:**/*.bpmn";

    private String jpaPersistenceUnitName;

    private boolean jpaCloseEntityManager = true;

    private boolean jpaHandleTransaction = true;

    /**
     * @return the processEngineName
     */
    public String getProcessEngineName() {
        return processEngineName;
    }

    /**
     * @param processEngineName
     *            the processEngineName to set
     */
    public void setProcessEngineName(String processEngineName) {
        this.processEngineName = processEngineName;
    }

    public void setHistoryLevel(String historyLevelString) {
        if (StringUtils.isNotBlank(historyLevelString)) {
            for (HistoryLevel historyLevel : HISTORY_LEVELS) {
                if (historyLevel.getName().toUpperCase()
                        .equals(historyLevelString.toUpperCase())) {
                    this.historyLevel = historyLevel;
                    break;
                }
            }
        }
    }

    public HistoryLevel getHistoryLevel() {
        return historyLevel;
    }

    /**
     * @return the jobExecutorActive
     */
    public boolean isJobExecutorActive() {
        return jobExecutorActive;
    }

    /**
     * @param jobExecutorActive
     *            the jobExecutorActive to set
     */
    public void setJobExecutorActive(boolean jobExecutorActive) {
        this.jobExecutorActive = jobExecutorActive;
    }

    /**
     * @return the jobExecutorDeploymentAware
     */
    public boolean isJobExecutorDeploymentAware() {
        return jobExecutorDeploymentAware;
    }

    /**
     * @param jobExecutorDeploymentAware
     *            the jobExecutorDeploymentAware to set
     */
    public void setJobExecutorDeploymentAware(boolean jobExecutorDeploymentAware) {
        this.jobExecutorDeploymentAware = jobExecutorDeploymentAware;
    }

    /**
     * @return the schemaUpdate
     */
    public boolean isSchemaUpdate() {
        return schemaUpdate;
    }

    /**
     * @param schemaUpdate
     *            the schemaUpdate to set
     */
    public void setSchemaUpdate(boolean schemaUpdate) {
        this.schemaUpdate = schemaUpdate;
    }

    /**
     * @return the databaseType
     */
    public String getDatabaseType() {
        return databaseType;
    }

    /**
     * @param databaseType
     *            the databaseType to set
     */
    public void setDatabaseType(String databaseType) {
        this.databaseType = databaseType;
    }

    /**
     * @return the databaseTablePrefix
     */
    public String getDatabaseTablePrefix() {
        return databaseTablePrefix;
    }

    /**
     * @param databaseTablePrefix
     *            the databaseTablePrefix to set
     */
    public void setDatabaseTablePrefix(String databaseTablePrefix) {
        this.databaseTablePrefix = databaseTablePrefix;
    }

    /**
     * @return the autoDeploymentEnabled
     */
    public boolean isAutoDeploymentEnabled() {
        return autoDeploymentEnabled;
    }

    /**
     * @param autoDeploymentEnabled
     *            the autoDeploymentEnabled to set
     */
    public void setAutoDeploymentEnabled(boolean autoDeploymentEnabled) {
        this.autoDeploymentEnabled = autoDeploymentEnabled;
    }

    /**
     * @return the deploymentResourcePattern
     */
    public String getDeploymentResourcePattern() {
        return deploymentResourcePattern;
    }

    /**
     * @param deploymentResourcePattern
     *            the deploymentResourcePattern to set
     */
    public void setDeploymentResourcePattern(String deploymentResourcePattern) {
        this.deploymentResourcePattern = deploymentResourcePattern;
    }

    /**
     * @return the jpaPersistenceUnitName
     */
    public String getJpaPersistenceUnitName() {
        return jpaPersistenceUnitName;
    }

    /**
     * @param jpaPersistenceUnitName
     *            the jpaPersistenceUnitName to set
     */
    public void setJpaPersistenceUnitName(String jpaPersistenceUnitName) {
        this.jpaPersistenceUnitName = jpaPersistenceUnitName;
    }

    /**
     * @return the jpaCloseEntityManager
     */
    public boolean isJpaCloseEntityManager() {
        return jpaCloseEntityManager;
    }

    /**
     * @param jpaCloseEntityManager
     *            the jpaCloseEntityManager to set
     */
    public void setJpaCloseEntityManager(boolean jpaCloseEntityManager) {
        this.jpaCloseEntityManager = jpaCloseEntityManager;
    }

    /**
     * @return the jpaHandleTransaction
     */
    public boolean isJpaHandleTransaction() {
        return jpaHandleTransaction;
    }

    /**
     * @param jpaHandleTransaction
     *            the jpaHandleTransaction to set
     */
    public void setJpaHandleTransaction(boolean jpaHandleTransaction) {
        this.jpaHandleTransaction = jpaHandleTransaction;
    }

}
