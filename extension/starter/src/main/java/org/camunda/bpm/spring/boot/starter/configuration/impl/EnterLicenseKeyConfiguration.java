package org.camunda.bpm.spring.boot.starter.configuration.impl;


import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.spring.boot.starter.CamundaBpmNestedRuntimeException;
import org.camunda.bpm.spring.boot.starter.util.CamundaBpmVersion;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;
import java.util.Scanner;

public class EnterLicenseKeyConfiguration extends AbstractCamundaConfiguration {
  private static final String INSERT_SQL = "INSERT INTO ACT_GE_PROPERTY VALUES ('camunda-license-key', ?, 1)";
  private static final String SELECT_SQL = "SELECT VALUE_ FROM ACT_GE_PROPERTY where NAME_ = 'camunda-license-key'";

  @Autowired
  private CamundaBpmVersion version;

  private String defaultLicenseFile = "camunda-license.txt";

  @Override
  public void postProcessEngineBuild(ProcessEngine processEngine) {
    if (!version.isEnterprise()) {
      return;
    }

    URL fileUrl = camundaBpmProperties.getLicenseFile();

    Optional<String> licenseKey = readLicenseKeyFromUrl(fileUrl);
    if (!licenseKey.isPresent()) {
      fileUrl = EnterLicenseKeyConfiguration.class.getClassLoader().getResource(defaultLicenseFile);
      licenseKey = readLicenseKeyFromUrl(fileUrl);
    }

    if (!licenseKey.isPresent()) {
      return;
    }

    try (Connection connection = dataSource(processEngine).getConnection()) {
      if (readLicenseKeyFromDatasource(connection).isPresent()) {
        return;
      }
      try (PreparedStatement statement = connection.prepareStatement(INSERT_SQL)) {
        statement.setString(1, licenseKey.get());
        statement.execute();
        LOG.enterLicenseKey(fileUrl);
      }
    } catch (SQLException ex) {
      throw new CamundaBpmNestedRuntimeException(ex.getMessage(), ex);
    }
  }

  static DataSource dataSource(ProcessEngine processEngine) {
    return processEngine.getProcessEngineConfiguration().getDataSource();
  }

  static Optional<String> readLicenseKeyFromDatasource(Connection connection) throws SQLException {
    final ResultSet resultSet = connection.createStatement().executeQuery(SELECT_SQL);
    return resultSet.next() ? Optional.ofNullable(resultSet.getString(1)) : Optional.empty();
  }

  static Optional<String> readLicenseKeyFromUrl(URL licenseFileUrl) {
    if (licenseFileUrl == null) {
      return Optional.empty();
    }
    try {
      return Optional.of(new Scanner(licenseFileUrl.openStream(), "UTF-8").useDelimiter("\\A"))
        .filter(Scanner::hasNext).map(Scanner::next)
        .map(s -> s.split("---------------")[2])
        .map(s -> s.replaceAll("\\n", ""))
        .map(String::trim);
    } catch (IOException e) {
      return Optional.empty();
    }
  }

}
