package org.camunda.bpm.spring.boot.starter.property;

import lombok.Data;
import lombok.Singular;

import java.util.HashMap;
import java.util.Map;

@Data
public class GenericProperties {
  @Singular
  private Map<String, Object> properties = new HashMap<String, Object>();
  private boolean ignoreInvalidFields;
  private boolean ignoreUnknownFields;
}
