package org.camunda.bpm.spring.boot.starter.container;

import org.junit.Test;

import java.net.URL;

import static org.assertj.core.api.Assertions.assertThat;

public class InitializeProcessesXmlStepTest {

  @Test
  public void getURL_of_ProcessApplication() throws Exception {
    URL url = InitializeProcessesXmlStep.getRootContext(new DummyApplication());

    assertThat(url.getPath()).endsWith("extension/starter/target/test-classes/org/");
  }
}
