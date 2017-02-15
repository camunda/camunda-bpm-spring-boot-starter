package org.camunda.bpm.spring.boot.starter.issue208;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Created by Andrew Eleneski on 2/13/2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Ignore("fails, see #208")
public class IntServiceMockTest {

  @MockBean
  private IntService intService;

  @Test
  public void testAMock(){

    when(intService.testIntServiceMethod()).thenReturn(10);

    assertThat(intService.testIntServiceMethod()).isEqualTo(10);

  }
}
