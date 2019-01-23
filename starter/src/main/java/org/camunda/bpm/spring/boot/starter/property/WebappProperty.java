/*
 * Copyright © 2015-2018 camunda services GmbH and various authors (info@camunda.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.camunda.bpm.spring.boot.starter.property;

import static org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties.joinOn;

public class WebappProperty {
  private boolean indexRedirectEnabled = true;

  private String webjarClasspath = "/META-INF/resources/webjars/camunda";

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
    return joinOn(this.getClass())
      .add("indexRedirectEnabled=" + indexRedirectEnabled)
      .add("webjarClasspath='" + webjarClasspath + '\'')
      .add("securityConfigFile='" + securityConfigFile + '\'')
      .toString();
  }
}
