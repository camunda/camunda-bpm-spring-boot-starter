package org.camunda.bpm.spring.boot.starter.runlistener;

import java.util.Properties;

import org.camunda.bpm.spring.boot.starter.CamundaBpmVersion;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;

public class PropertiesListener implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {

  private static final String VERSION_FORMAT = "(v%s)";

  @Override
  public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
    ConfigurableEnvironment environment = event.getEnvironment();
    Properties props = new Properties();
    String camundaVersion = getNullSafe(CamundaBpmVersion.getVersion());
    props.put("camunda.bpm.version", camundaVersion);
    props.put("camunda.bpm.formatted-version", formatVersion(camundaVersion));
    environment.getPropertySources().addFirst(new PropertiesPropertySource("myProps", props));

  }

  private String getNullSafe(String string) {
    return string == null ? "" : string;
  }

  private String formatVersion(String version) {
    return String.format(VERSION_FORMAT, version);
  }

}
