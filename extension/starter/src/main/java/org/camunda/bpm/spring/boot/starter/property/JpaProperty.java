package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;

@Data
public class JpaProperty {
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
}
