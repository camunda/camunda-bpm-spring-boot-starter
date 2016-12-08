package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;
import org.apache.commons.lang.StringUtils;
import org.camunda.bpm.engine.identity.User;

import static java.util.Objects.requireNonNull;
import static org.apache.commons.lang.WordUtils.capitalize;

@Data
public class AdminUserProperty implements User {
  private String id;
  private String firstName;
  private String lastName;
  private String email;
  private String password;

  public User init() {
    requireNonNull(getId(), "missing field: camunda.bpm.admin-user.id");
    requireNonNull(getPassword(), "missing field: camunda.bpm.admin-user.password");

    if (StringUtils.isBlank(getFirstName())) {
      setFirstName(capitalize(id));
    }
    if (StringUtils.isBlank(getLastName())) {
      setLastName(capitalize(id));
    }
    if (StringUtils.isBlank(getEmail())) {
      setEmail(id + "@localhost");
    }

    return this;
  }
}
