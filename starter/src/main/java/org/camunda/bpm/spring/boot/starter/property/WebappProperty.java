package org.camunda.bpm.spring.boot.starter.property;

import org.springframework.boot.context.properties.NestedConfigurationProperty;

import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.joinOn;

public class WebappProperty {
  private boolean indexRedirectEnabled = true;

  // TODO: META-INF/resources/webjars/camunda}")
  private String webjarClasspath = "/META-INF/resources";

  private String securityConfigFile = "/securityFilterRules.json";

  @NestedConfigurationProperty
  private CsrfProperties csrf = new CsrfProperties();

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

  public CsrfProperties getCsrf() {
    return csrf;
  }

  public void setCsrf(CsrfProperties csrf) {
    this.csrf = csrf;
  }

  @Override
  public String toString() {
    return joinOn(this.getClass())
      .add("indexRedirectEnabled=" + indexRedirectEnabled)
      .add("webjarClasspath='" + webjarClasspath + '\'')
      .add("securityConfigFile='" + securityConfigFile + '\'')
      .add("csrf='" + csrf + '\'')
      .toString();
  }
}
