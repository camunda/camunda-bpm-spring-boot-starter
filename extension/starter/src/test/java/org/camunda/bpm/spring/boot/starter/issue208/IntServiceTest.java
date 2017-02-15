package org.camunda.bpm.spring.boot.starter.issue208;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by Andrew Eleneski on 2/13/2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Ignore("fails, see #208")
public class IntServiceTest {

  @Autowired
  private IntService intService;

  @Test
  public void testA(){

    assertThat(intService.testIntServiceMethod()).isEqualTo(5);

  }
}
