package org.camunda.bpm.engine.test.assertions.bpmn;

import org.assertj.core.api.Assertions;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngines;
import org.camunda.bpm.engine.test.util.CamundaBpmApi;

import java.util.Map;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public abstract class AbstractAssertions extends Assertions {

  static ThreadLocal<ProcessEngine> processEngine = new ThreadLocal<ProcessEngine>();

  /**
   * Retrieve the processEngine bound to the current testing thread
   * via calling init(ProcessEngine processEngine). In case no such
   * processEngine is bound yet, init(processEngine) is called with
   * a default process engine.
   *
   * @return  processEngine bound to the current testing thread
   * @throws  IllegalStateException in case a processEngine has not
   *          been initialised yet and cannot be initialised with a 
   *          default engine.
   */
  public static ProcessEngine processEngine() {
    ProcessEngine processEngine = AbstractAssertions.processEngine.get();
    if (processEngine != null)
      return processEngine;
    Map<String, ProcessEngine> processEngines = ProcessEngines.getProcessEngines();
    if (processEngines.size() == 1) {
      processEngine = processEngines.values().iterator().next();
      init(processEngine);
      return processEngine;
    }
    String message = processEngines.size() == 0 ? "No ProcessEngine found to be " +
      "registered with " + ProcessEngines.class.getSimpleName() + "!"
      : String.format(processEngines.size() + " ProcessEngines initialized. Call %s.init" +
      "(ProcessEngine processEngine) first!", BpmnAwareTests.class.getSimpleName());
    throw new IllegalStateException(message);
  }

  /**
   * Bind an instance of ProcessEngine to the current testing calls done
   * in your test method.
   *
   * @param   processEngine ProcessEngine which should be bound to the
   *          current testing thread.
   */
  public static void init(final ProcessEngine processEngine) {
    AbstractAssertions.processEngine.set(processEngine);
    AbstractProcessAssert.resetLastAsserts();
  }

  /**
   * Resets operations done via calling init(ProcessEngine processEngine)
   * to its clean state - just as before calling init() for the first time.
   */
  public static void reset() {
    AbstractAssertions.processEngine.remove();
    AbstractProcessAssert.resetLastAsserts();
  }

  /*
   * *Asserts* that process engine supports the requested API version. Use 
   * method at the beginning of BPMN related method implementations which 
   * exceptionally require a Camunda BPM API versions higher than '7.1'
   * 
   * @param   api Camunda BPM API version e.g. '7.2', '7.3' etc.
   * @throws  AssertionError if process engine does not support the requested API version
   */
  protected static void assertApi(String api) {
    AbstractProcessAssert.assertApi(api);
  }

  protected static boolean supportsApi(String api) {
    return CamundaBpmApi.supports(api);
  }

}
