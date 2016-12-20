package org.camunda.bpm.spring.boot.starter.property;

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
    return "FilterProperty [create=" + create + "]";
  }

}
