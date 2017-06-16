package org.camunda.bpm.spring.boot.properties;

import static org.camunda.bpm.spring.boot.properties.CamundaBpmProperties.joinOn;

public class FilterProperty {

  private String create;

  public String getCreate() {
    return create;
  }

  public void setCreate(String create) {
    this.create = create;
  }

  @Override
  public String toString() {
    return joinOn(this.getClass())
      .add("create=" + create)
      .toString();
  }

}
