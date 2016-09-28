package org.camunda.bpm.spring.boot.starter.generic;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Map;

import org.junit.Test;

public class GenericProcessEnginePropertiesTest {

  @Test
  public void mustBeFilteredTest() {
    GenericProcessEngineProperties processEngineProperties = new GenericProcessEngineProperties();
    processEngineProperties.getPropertiesToFilter().add("filtered-property");
    assertFalse(processEngineProperties.mustBeFiltered("not-filtered-property"));
    assertTrue(processEngineProperties.mustBeFiltered("filtered-property"));
    assertTrue(processEngineProperties.mustBeFiltered("filteredProperty"));
  }

  @Test
  public void getPropertiesFilteredTest() {
    GenericProcessEngineProperties processEngineProperties = new GenericProcessEngineProperties();
    processEngineProperties.getPropertiesToFilter().add("filtered-property");
    processEngineProperties.getProperties().put("filtered-property", "filteredValue");
    processEngineProperties.getProperties().put("not-filtered-property", "notFilteredValue");
    Map<String, Object> propertiesFiltered = processEngineProperties.getPropertiesFiltered();
    assertThat(propertiesFiltered).doesNotContainKey("filtered-property");
    assertThat(propertiesFiltered).containsKey("not-filtered-property");
  }
}
