package org.camunda.bpm.spring.boot.starter.util;

import org.camunda.bpm.engine.ProcessEngine;

import java.util.Optional;
import java.util.function.Supplier;

/**
 * Return the full version string of the present Camunda codebase, or
 * {@code null} if it cannot be determined.
 *
 * return the version of Camunda or {@code null}
 * @see Package#getImplementationVersion()
 */
public enum CamundaBpmVersion implements Supplier<String> {
  INSTANCE;

  private Optional<String> version;

  public String get() {
    if (version == null) {
      Package pkg = ProcessEngine.class.getPackage();
      version = Optional.ofNullable(pkg.getImplementationVersion());
    }
    return version.orElse(null);
  }

  public boolean isEnterprise() {
    return version != null && version.map(s -> s.endsWith("-ee")).orElse(false);
  }
}
