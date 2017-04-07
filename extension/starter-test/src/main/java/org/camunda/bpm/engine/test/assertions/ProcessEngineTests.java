package org.camunda.bpm.engine.test.assertions;


import org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests;
import org.camunda.bpm.engine.test.assertions.cmmn.CmmnAwareTests;

/**
 * Convenience class to access all available Camunda BPM related 
 * Assertions PLUS helper methods. Use it with a static import:
 *
 * import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*;
 *   
 * @see BpmnAwareTests if you only want to see BPMN related functionality
 *
 * @author Martin Schimak <martin.schimak@plexiti.com>
 * @author Martin Günther <martin.guenter@holisticon.de>
 * @author Malte Sörensen <malte.soerensen@holisticon.de>
 */
public class ProcessEngineTests extends CmmnAwareTests {

  protected ProcessEngineTests() {}

}
