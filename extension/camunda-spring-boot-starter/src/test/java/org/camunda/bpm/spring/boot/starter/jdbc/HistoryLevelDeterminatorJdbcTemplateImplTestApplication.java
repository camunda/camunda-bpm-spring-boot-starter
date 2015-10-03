package org.camunda.bpm.spring.boot.starter.jdbc;

import javax.sql.DataSource;

import org.camunda.bpm.spring.boot.starter.CamundaBpmAutoConfiguration;
import org.camunda.bpm.spring.boot.starter.CamundaBpmProperties;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

@EnableAutoConfiguration(exclude = CamundaBpmAutoConfiguration.class)
public class HistoryLevelDeterminatorJdbcTemplateImplTestApplication {

  @Bean
  public CamundaBpmProperties camundaBpmProperties() {
    return new CamundaBpmProperties();
  }

  @Bean
  public DataSource dataSource() {
    EmbeddedDatabaseBuilder builder = new EmbeddedDatabaseBuilder();
    EmbeddedDatabase db = builder.setType(EmbeddedDatabaseType.H2).addScript("/org/camunda/bpm/engine/db/create/activiti.h2.create.engine.sql")
        .addScript("db/sql/insert-history-data.sql").build();
    return db;
  }

  @Bean
  public JdbcTemplate jdbcTemplate(DataSource dataSource) {
    return new JdbcTemplate(dataSource);
  }

  @Bean
  public HistoryLevelDeterminator historyLevelDeterminator(JdbcTemplate jdbcTemplate, CamundaBpmProperties camundaBpmProperties) {
    HistoryLevelDeterminatorJdbcTemplateImpl historyLevelDeterminator = new HistoryLevelDeterminatorJdbcTemplateImpl();
    historyLevelDeterminator.setJdbcTemplate(jdbcTemplate);
    historyLevelDeterminator.setCamundaBpmProperties(camundaBpmProperties);
    return historyLevelDeterminator;
  }
}
