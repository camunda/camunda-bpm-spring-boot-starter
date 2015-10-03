package org.camunda.bpm.spring.boot.starter.jdbc;

import static org.junit.Assert.assertEquals;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { HistoryLevelDeterminatorJdbcTemplateImplTestApplication.class })
@Transactional
public class HistoryLevelDeterminatorJdbcTemplateImplIT {

  @Autowired
  private HistoryLevelDeterminator historyLevelDeterminator;

  @Test
  public void test() {
    assertEquals("activity", historyLevelDeterminator.determineHistoryLevel());
  }
}
