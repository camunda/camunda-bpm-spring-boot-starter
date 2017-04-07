package org.camunda.bpm.engine.test.util;

import org.assertj.core.api.Assertions;

import java.util.*;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public class CamundaBpmApi {

  private static Map<String, String> markerClasses = new HashMap<String, String>();

  static {
    markerClasses.put("7.0", "org.camunda.bpm.engine.ProcessEngine");
    markerClasses.put("7.1", "org.camunda.bpm.engine.management.JobDefinitionQuery");
    markerClasses.put("7.2", "org.camunda.bpm.engine.CaseService");
    markerClasses.put("7.3", "org.camunda.bpm.engine.runtime.ProcessInstanceModificationBuilder");
    markerClasses.put("7.4", "org.camunda.bpm.dmn.engine.DmnEngine");
  }

  /**
   * Answers, if process engine supports the requested API version.
   *
   * @param   api Camunda BPM API version e.g. '7.1', '7.2' etc.
   * @return  true, if process engine supports the requested API version.          
   */
  public static boolean supports(String api) {
    List<String> apis = new ArrayList<String>(markerClasses.keySet());
    Collections.sort(apis);
    Assertions.assertThat(apis)
      .overridingErrorMessage(String.format("Unknown API version %s requested, currently "
        + "just %s are supported.", api, apis))
      .contains(api);
    try {
      Class.forName(markerClasses.get(api));
    } catch (ClassNotFoundException e) {
      return false;
    }
    return true;
  }

}
