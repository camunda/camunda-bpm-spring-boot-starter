package org.camunda.bpm.spring.boot.starter.property;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.impl.persistence.entity.UserEntity;

import java.util.function.Supplier;

import static java.util.Objects.requireNonNull;
import static org.apache.commons.lang.WordUtils.capitalize;

@Data
public class AdminUser implements User {
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
