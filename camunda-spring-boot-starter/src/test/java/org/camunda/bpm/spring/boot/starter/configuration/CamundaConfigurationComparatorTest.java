package org.camunda.bpm.spring.boot.starter.configuration;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class CamundaConfigurationComparatorTest {

  @Mock
  private CamundaConfiguration mock1;

  @Mock
  private CamundaConfiguration mock2;

  @Test
  public void compareTest() {
    CamundaConfigurationComparator comparator = new CamundaConfigurationComparator();

    when(mock1.getOrder()).thenReturn(1);
    when(mock2.getOrder()).thenReturn(1);
    assertEquals(0, comparator.compare(mock1, mock2));

    when(mock1.getOrder()).thenReturn(1);
    when(mock2.getOrder()).thenReturn(2);
    assertEquals(-1, comparator.compare(mock1, mock2));

    when(mock1.getOrder()).thenReturn(2);
    when(mock2.getOrder()).thenReturn(1);
    assertEquals(1, comparator.compare(mock1, mock2));
  }
}
