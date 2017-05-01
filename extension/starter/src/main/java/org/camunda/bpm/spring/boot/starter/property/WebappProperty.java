package org.camunda.bpm.spring.boot.starter.property;

public class WebappProperty {
  private boolean indexRedirectEnabled = true;

  // TODO: META-INF/resources/webjars/camunda}")
  private String webjarClasspath = "";

  private String securityConfigFile = "/securityFilterRules.json";

  public boolean isIndexRedirectEnabled() {
    return indexRedirectEnabled;
  }

  public void setIndexRedirectEnabled(boolean indexRedirectEnabled) {
    this.indexRedirectEnabled = indexRedirectEnabled;
  }

  public String getWebjarClasspath() {
    return webjarClasspath;
  }

  public void setWebjarClasspath(String webjarClasspath) {
    this.webjarClasspath = webjarClasspath;
  }

  public String getSecurityConfigFile() {
    return securityConfigFile;
  }

  public void setSecurityConfigFile(String securityConfigFile) {
    this.securityConfigFile = securityConfigFile;
  }

  @Override
  public String toString() {
    return "WebappProperty{" +
      "indexRedirectEnabled=" + indexRedirectEnabled +
      ", webjarClasspath='" + webjarClasspath + '\'' +
      ", securityConfigFile='" + securityConfigFile + '\'' +
      '}';
  }
}
