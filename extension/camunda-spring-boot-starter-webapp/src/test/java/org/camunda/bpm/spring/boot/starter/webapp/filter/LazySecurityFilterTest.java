package org.camunda.bpm.spring.boot.starter.webapp.filter;

import static org.junit.Assert.assertSame;

import org.junit.Test;

public class LazySecurityFilterTest {

  @Test
  public void instanceTest() {
    LazySecurityFilter filter = new LazySecurityFilter();
    assertSame(filter, LazySecurityFilter.INSTANCE);
  }
}
