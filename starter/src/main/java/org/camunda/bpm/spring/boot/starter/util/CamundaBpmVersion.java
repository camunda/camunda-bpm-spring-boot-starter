package org.camunda.bpm.spring.boot.starter.util;

import org.camunda.bpm.engine.ProcessEngine;
import org.springframework.core.env.PropertiesPropertySource;

import java.util.Arrays;
import java.util.Optional;
import java.util.Properties;
import java.util.function.Supplier;

import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.PREFIX;

/**
 * Return the full version string of the present Camunda codebase, or
 * {@code null} if it cannot be determined.
 * <p>
 * return the version of Camunda or {@code null}
 *
 * @see Package#getImplementationVersion()
 */
public class CamundaBpmVersion implements Supplier<String> {

  private static final String VERSION_FORMAT = "(v%s)";
  public static final String VERSION = "version";
  public static final String IS_ENTERPRISE = "is-enterprise";
  public static final String FORMATTED_VERSION = "formatted-version";

  public static String key(String name) {
    return PREFIX + "." + name;
  }

  private final String version;
  private final boolean isEnterprise;
  private final String formattedVersion;

  public CamundaBpmVersion() {
    this(ProcessEngine.class.getPackage());
  }

  CamundaBpmVersion(final Package pkg) {
    this.version = Optional.ofNullable(pkg.getImplementationVersion())
      .map(String::trim)
      .orElse("");
    this.isEnterprise = version.endsWith("-ee");
    this.formattedVersion = String.format(String.format(VERSION_FORMAT, version));
  }

  @Override
  public String get() {
    return version;
  }

  public boolean isEnterprise() {
    return isEnterprise;
  }

  public PropertiesPropertySource getPropertiesPropertySource() {
    final Properties props = new Properties();
    props.put(key(VERSION), version);
    props.put(key(IS_ENTERPRISE), isEnterprise);
    props.put(key(FORMATTED_VERSION), formattedVersion);

    return new PropertiesPropertySource(this.getClass().getSimpleName(), props);
  }

  public boolean isLaterThanOrEqual(String versionToCompare) {
    String currentVersion = version;

    // remove enterprise suffix if available
    if (isEnterprise) {
      currentVersion = currentVersion.split("-ee")[0];
    }
    if (versionToCompare.contains("-ee")) {
      versionToCompare = versionToCompare.split("-ee")[0];
    }

    // parse version numbers
    int[] currentVersionNumbers = Arrays.stream(currentVersion.split("\\."))
      .mapToInt(Integer::parseInt)
      .toArray();
    int[] comparingVersionNumbers = Arrays.stream(versionToCompare.split("\\."))
      .mapToInt(Integer::parseInt)
      .toArray();

    if (currentVersionNumbers.length != 3 && currentVersionNumbers.length != comparingVersionNumbers.length) {
      throw new RuntimeException(String.format("Exception while checking version numbers %s and %s", version, versionToCompare));
    }

    // compare major, minor and patch versions
    if (currentVersionNumbers[0] > comparingVersionNumbers[0]) {
      return true;
    }

    if (currentVersionNumbers[1] > comparingVersionNumbers[1]) {
      return true;
    }

    if (currentVersionNumbers[2] >= comparingVersionNumbers[2]) {
      return true;
    }

    return false;
  }

}
