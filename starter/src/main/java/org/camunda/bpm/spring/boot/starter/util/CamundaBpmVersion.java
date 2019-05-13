package org.camunda.bpm.spring.boot.starter.util;

import org.camunda.bpm.engine.ProcessEngine;
import org.springframework.core.env.PropertiesPropertySource;

import java.util.Arrays;
import java.util.Optional;
import java.util.Properties;
import java.util.function.Supplier;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.PREFIX;

/**
 * Return the full version string of the present Camunda codebase, or
 * {@code null} if it cannot be determined.
 * <p/>
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
    this.formattedVersion = String.format(VERSION_FORMAT, version);
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

    Pattern semVerRegex = Pattern.compile("^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)).*");
    Matcher srcVersionMatcher = semVerRegex.matcher(version);
    Matcher trgVersionMatcher = semVerRegex.matcher(versionToCompare);

    // only accept "major.minor.patch-[alpha#|ee]" formatted version strings
    if (!srcVersionMatcher.matches() || !trgVersionMatcher.matches()) {
      throw new RuntimeException(String.format("Exception while checking version numbers '%s' and '%s'. Version numbers are missing or incompatible.", version, versionToCompare));
    };

    currentVersion = srcVersionMatcher.group(1);
    versionToCompare = trgVersionMatcher.group(1);

    // don't do semantic version check if version strings are equal
    if (currentVersion.equals(versionToCompare)) {
      return true;
    }

    // parse version numbers
    int[] currentVersionNumbers = Arrays.stream(currentVersion.split("\\."))
      .mapToInt(Integer::parseInt)
      .toArray();
    int[] comparingVersionNumbers = Arrays.stream(versionToCompare.split("\\."))
      .mapToInt(Integer::parseInt)
      .toArray();

    // compare major, minor and patch versions
    for (int i = 0; i < 3; i++) {
      // if numbers are equal, skip and check next version number
      if (currentVersionNumbers[i] != comparingVersionNumbers[i]) {
        return currentVersionNumbers[i] > comparingVersionNumbers[i];
      }
    }

    return false;
  }

}
