package org.camunda.bpm.engine.test.assertions;

import org.camunda.bpm.engine.test.assertions.bpmn.*;
import org.camunda.bpm.engine.test.assertions.cmmn.CmmnAwareAssertions;

/**
 * Convenience class to access all available Camunda BPM Assertions. 
 * Use it with a static import:
 *
 * import static org.camunda.bpm.engine.test.assertions.ProcessEngineAssertions.*;
 *
 * @see ProcessEngineTests for full Camunda BPM Assert functionality PLUS helper methods.
 * @see BpmnAwareAssertions if you only want to see BPMN related Assertions
 * 
 * @author Martin Schimak <martin.schimak@plexiti.com>
 * @author Martin Günther <martin.guenter@holisticon.de>
 * @author Malte Sörensen <malte.soerensen@holisticon.de>
 */
public class ProcessEngineAssertions extends CmmnAwareAssertions {
  
  protected ProcessEngineAssertions() {}
  
}
