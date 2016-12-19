package org.camunda.bpm.spring.boot.starter.property;

public class WebappProperty {
  private boolean indexRedirectEnabled = true;

  public boolean isIndexRedirectEnabled() {
    return indexRedirectEnabled;
  }

  public void setIndexRedirectEnabled(boolean indexRedirectEnabled) {
    this.indexRedirectEnabled = indexRedirectEnabled;
  }

  @Override
  public String toString() {
    return "WebappProperty [indexRedirectEnabled=" + indexRedirectEnabled + "]";
  }

}
