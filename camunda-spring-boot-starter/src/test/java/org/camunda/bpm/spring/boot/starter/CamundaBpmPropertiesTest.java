package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.junit.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

public class CamundaBpmPropertiesTest {

  @Test
  public void allHistoryLevelsTest() throws Exception {
    List<Class<? extends HistoryLevel>> historyLevels = new ArrayList<>();
    for (HistoryLevel historyLevel : CamundaBpmProperties.HISTORY_LEVELS) {
      historyLevels.add(historyLevel.getClass());
    }
    for (Field field : HistoryLevel.class.getDeclaredFields()) {
      if (Modifier.isStatic(field.getModifiers())
        && field.getDeclaringClass().isAssignableFrom(HistoryLevel.class)) {
        historyLevels.remove(field.get(null).getClass());
      }
    }
    assertTrue(historyLevels.isEmpty());
  }

  @Test
  public void setHistoryLevelTest() {
    CamundaBpmProperties properties = new CamundaBpmProperties();
    properties.setHistoryLevel(null);
    assertNull(properties.getHistoryLevel());
    properties.setHistoryLevel("");
    assertNull(properties.getHistoryLevel());
    properties.setHistoryLevel("not known");
    assertNull(properties.getHistoryLevel());
    for (HistoryLevel historyLevel : CamundaBpmProperties.HISTORY_LEVELS) {
      properties.setHistoryLevel(historyLevel.getName());
      assertEquals(historyLevel, properties.getHistoryLevel());
      properties.setHistoryLevel(historyLevel.getName().toLowerCase());
      assertEquals(historyLevel, properties.getHistoryLevel());
    }
  }
}
