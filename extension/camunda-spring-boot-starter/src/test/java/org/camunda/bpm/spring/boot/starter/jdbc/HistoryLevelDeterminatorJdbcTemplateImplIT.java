package org.camunda.bpm.spring.boot.starter.jdbc;

import static org.junit.Assert.assertEquals;

import javax.transaction.Transactional;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { HistoryLevelDeterminatorJdbcTemplateImplTestApplication.class })
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
