package org.camunda.bpm.spring.boot.starter.util;

import org.camunda.bpm.engine.ProcessEngine;

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

  public String get() {
    Package pkg = ProcessEngine.class.getPackage();
    return (pkg != null ? pkg.getImplementationVersion() : null);
  }

}
