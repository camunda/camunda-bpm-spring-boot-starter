package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.ProcessEngine;

public final class CamundaBpmVersion {

  /**
   * Return the full version string of the present Camunda codebase, or
   * {@code null} if it cannot be determined.
   *
   * @return the version of Camunda or {@code null}
   * @see Package#getImplementationVersion()
   */
  public static String getVersion() {
    Package pkg = ProcessEngine.class.getPackage();
    return (pkg != null ? pkg.getImplementationVersion() : null);
  }

  private CamundaBpmVersion() {
  }
}
