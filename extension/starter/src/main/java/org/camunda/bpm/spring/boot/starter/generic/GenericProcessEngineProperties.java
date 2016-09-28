package org.camunda.bpm.spring.boot.starter.generic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.boot.bind.RelaxedNames;
import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@ValidGenericProcessEngineProperties
@Data
public class GenericProcessEngineProperties {

  public static final String PREFIX = "camunda.bpm.process-engine-configuration.properties";

  private final List<String> propertiesToFilter = new ArrayList<>();

  private Map<String, Object> properties = new HashMap<String, Object>();
  private boolean ignoreInvalidFields;
  private boolean ignoreUnknownFields;
  private boolean filterProperties = true;

  public Map<String, Object> getPropertiesFiltered() {
    return properties.entrySet().stream().filter(e -> !mustBeFiltered(e.getKey())).collect(Collectors.toMap(e -> e.getKey(), e -> e.getValue()));
  }

  protected boolean mustBeFiltered(String value) {
    List<String> matches = new ArrayList<>();
    for (RelaxedNames relaxedFilterNames : propertiesToFilter.stream().map(s -> new RelaxedNames(s)).collect(Collectors.toList())) {
      for (String name : relaxedFilterNames) {
        if (name.equals(value)) {
          matches.add(name);
        }
      }
    }

    return !matches.isEmpty();
  }

  /**
   * For generating auto completion informations only
   */
  @ConfigurationProperties(prefix = PREFIX)
  private static class CodeCompletionForPropertiesHelper extends SpringProcessEngineConfiguration {

  }
}