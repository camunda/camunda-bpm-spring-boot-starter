package org.camunda.bpm.spring.boot.starter.property;

import org.apache.commons.lang.StringUtils;
import org.camunda.bpm.engine.identity.User;

import static java.util.Objects.requireNonNull;
import static org.apache.commons.lang.WordUtils.capitalize;


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

  @Override
  public String getId() {
    return id;
  }

  @Override
  public void setId(String id) {
    this.id = id;
  }

  @Override
  public String getFirstName() {
    return firstName;
  }

  @Override
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  @Override
  public String getLastName() {
    return lastName;
  }

  @Override
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  @Override
  public String getEmail() {
    return email;
  }

  @Override
  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public String toString() {
    return "AdminUserProperty [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName
        + ", email=" + email + ", password=" + password + "]";
  }

}
