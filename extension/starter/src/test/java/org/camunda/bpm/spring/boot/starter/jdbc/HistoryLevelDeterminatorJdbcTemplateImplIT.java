package org.camunda.bpm.spring.boot.starter.jdbc;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { HistoryLevelDeterminatorJdbcTemplateImplTestApplication.class })
@Transactional
@Ignore("does not work with mvn, historyLevel is not set in db. works in IDE.")
public class HistoryLevelDeterminatorJdbcTemplateImplIT {

  @Autowired
  private HistoryLevelDeterminator historyLevelDeterminator;

  @Test
  public void test() {
    assertEquals("full", historyLevelDeterminator.determineHistoryLevel());
  }
}
