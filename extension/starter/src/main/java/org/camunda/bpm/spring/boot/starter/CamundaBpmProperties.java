package org.camunda.bpm.spring.boot.starter;

import static org.springframework.core.io.support.ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;

import org.camunda.bpm.application.impl.metadata.ProcessArchiveXmlImpl;
import org.camunda.bpm.application.impl.metadata.spi.ProcessArchiveXml;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.repository.ResumePreviousBy;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.util.PropertiesToConfigurationBinder;
import org.springframework.boot.bind.RelaxedNames;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import lombok.Data;

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
   * metrics configuration
   */
  private Metrics metrics = new Metrics();

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

  @NestedConfigurationProperty
  private GenericProcessEngineConfiguration processEngineConfiguration = new GenericProcessEngineConfiguration();

  @Data
  public static class JobExecution {

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

  @org.camunda.bpm.spring.boot.starter.CamundaBpmProperties.GenericProcessEngineConfiguration.ValidProcessEngineConfigurationProperties
  @Data
  public static class GenericProcessEngineConfiguration {

    private static final String DEFAULT_SERIALIZATION_FORMAT = "default-serialization-format";

    private static final String PROCESS_ENGINE_NAME = "process-engine-name";

    private static final String JPA_PERSISTENCE_UNIT_NAME = "jpa_persistence-unit-name";

    private static final String JPA_CLOSE_ENTITY_MANAGER = "jpa_close-entity-manager";

    private static final String JPA_HANDLE_TRANSACTION = "jpa_handle-transaction";

    public static final String PREFIX = "camunda.bpm.process-engine-configuration.properties";

    private final List<String> FILTER = Arrays.asList(PROCESS_ENGINE_NAME, DEFAULT_SERIALIZATION_FORMAT, JPA_PERSISTENCE_UNIT_NAME, JPA_CLOSE_ENTITY_MANAGER,
        JPA_HANDLE_TRANSACTION);

    private Map<String, Object> properties = new HashMap<String, Object>();
    private boolean ignoreInvalidFields;
    private boolean ignoreUnknownFields;

    public GenericProcessEngineConfiguration() {
      addDefaultValues();
    }

    public SpringProcessEngineConfiguration build() {
      return PropertiesToConfigurationBinder.bind(this);
    }

    public SpringProcessEngineConfiguration buildFiltered() {
      SpringProcessEngineConfiguration springProcessEngineConfiguration = new SpringProcessEngineConfiguration();
      PropertiesToConfigurationBinder.bind(springProcessEngineConfiguration, getPropertiesFiltered(), false, false);
      return springProcessEngineConfiguration;
    }

    private void addDefaultValues() {
      properties.put(PROCESS_ENGINE_NAME, ProcessEngines.NAME_DEFAULT);
      properties.put("database-schema-update", ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
      properties.put("history", HistoryLevel.HISTORY_LEVEL_FULL.getName());
      properties.put(DEFAULT_SERIALIZATION_FORMAT, new SpringProcessEngineConfiguration().getDefaultSerializationFormat());
      properties.put(JPA_CLOSE_ENTITY_MANAGER, true);
      properties.put(JPA_HANDLE_TRANSACTION, true);
    }

    public Map<String, Object> getPropertiesFiltered() {
      return properties.entrySet().stream().filter(e -> !mustBeFiltered(e.getKey())).collect(Collectors.toMap(e -> e.getKey(), e -> e.getValue()));
    }

    private boolean mustBeFiltered(String value) {
      List<String> matches = new ArrayList<>();
      for (RelaxedNames relaxedFilterNames : FILTER.stream().map(s -> new RelaxedNames(s)).collect(Collectors.toList())) {
        for (String name : relaxedFilterNames) {
          if (name.equals(value)) {
            matches.add(name);
          }
        }
      }

      return !matches.isEmpty();
    }

    @Documented
    @Constraint(validatedBy = GenericProcessEngineConfiguration.Validator.class)
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    static @interface ValidProcessEngineConfigurationProperties {
      String message()

      default "";

      Class<?>[] groups() default {};

      Class<? extends Payload>[] payload() default {};
    }

    public static final class Validator
        implements ConstraintValidator<GenericProcessEngineConfiguration.ValidProcessEngineConfigurationProperties, GenericProcessEngineConfiguration> {

      public static final List<String> SCHEMA_UPDATE_VALUES = Arrays.asList(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE,
          ProcessEngineConfiguration.DB_SCHEMA_UPDATE_FALSE, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE,
          ProcessEngineConfiguration.DB_SCHEMA_UPDATE_CREATE_DROP, ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_DROP_CREATE);

      @Override
      public void initialize(GenericProcessEngineConfiguration.ValidProcessEngineConfigurationProperties constraintAnnotation) {
      }

      @Override
      public boolean isValid(GenericProcessEngineConfiguration genericProcessEngineConfiguration, ConstraintValidatorContext context) {
        SpringProcessEngineConfiguration springProcessEngineConfiguration = genericProcessEngineConfiguration.build();
        final String schemaUpdate = springProcessEngineConfiguration.getDatabaseSchemaUpdate();
        boolean isValid = SCHEMA_UPDATE_VALUES.contains(schemaUpdate);
        if (!isValid) {
          context.disableDefaultConstraintViolation();
          context.buildConstraintViolationWithTemplate(String.format("schemaUpdate: '%s' is not valid (%s)", schemaUpdate, SCHEMA_UPDATE_VALUES))
              .addPropertyNode("schemaUpdate").addConstraintViolation();
        }
        return isValid;
      }

    }
  }
}
