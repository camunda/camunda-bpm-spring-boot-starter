package org.camunda.bpm.engine.test.util;

import org.junit.Assume;

/**
 * @author Martin Schimak <martin.schimak@plexiti.com>
 */
public class CamundaBpmApiAwareTestCase {

  protected void assumeApi(String api) {
    Assume.assumeTrue(CamundaBpmApi.supports(api));
  }

}
