package org.camunda.bpm.spring.boot.starter.webapp.filter;

import static org.junit.Assert.assertSame;

import org.junit.Test;

public class LazyProcessEnginesFilterTest {

  @Test
  public void instanceTest() {
    LazyProcessEnginesFilter filter = new LazyProcessEnginesFilter();
    assertSame(filter, LazyProcessEnginesFilter.INSTANCE);
  }
}
