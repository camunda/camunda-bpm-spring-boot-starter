package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;
import org.camunda.bpm.engine.ProcessEngines;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.net.URL;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.core.io.support.ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX;

@ConfigurationProperties(CamundaBpmProperties.PREFIX)
@Data
public class CamundaBpmProperties {

  public static final String PREFIX = "camunda.bpm";

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
  private String defaultSerializationFormat = Defaults.INSTANCE.getDefaultSerializationFormat();

  private URL licenseFile;

  /**
   * metrics configuration
   */
  @NestedConfigurationProperty
  private Metrics metrics = new Metrics();

  /**
   * database configuration
   */
  @NestedConfigurationProperty
  private Database database = new Database();

  /**
   * JPA configuration
   */
  @NestedConfigurationProperty
  private Jpa jpa = new Jpa();

  /**
   * job execution configuration
   */
  @NestedConfigurationProperty
  private JobExecution jobExecution = new JobExecution();

  /**
   * webapp configuration
   */
  @NestedConfigurationProperty
  private Webapp webapp = new Webapp();

  /**
   * process application/processes.xml configuration
   */
  @NestedConfigurationProperty
  private Application application = new Application();

  @NestedConfigurationProperty
  private Authorization authorization = new Authorization();

  @NestedConfigurationProperty
  private GenericProperties genericProperties = new GenericProperties();

  @NestedConfigurationProperty
  private AdminUser adminUser = new AdminUser();

}
