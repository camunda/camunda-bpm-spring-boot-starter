package org.camunda.bpm.spring.boot.starter.configuration.impl;


import lombok.SneakyThrows;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.util.IoUtil;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.spring.boot.starter.util.CamundaBpmVersion;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Optional;
import java.util.Scanner;

public class EnterLicenseKeyConfiguration extends AbstractCamundaConfiguration {
  private static final String INSERT_SQL = "INSERT INTO ACT_GE_PROPERTY VALUES ('camunda-license-key', ?, 1)";
  private static final String SELECT_SQL = "SELECT VALUE_ FROM ACT_GE_PROPERTY where NAME_ = 'camunda-license-key'";

  @Override
  @SneakyThrows
  public void postProcessEngineBuild(ProcessEngine processEngine) {
    if (!CamundaBpmVersion.INSTANCE.isEnterprise() || camundaBpmProperties.getLicenseFile() == null) {
      return;
    }
    final DataSource dataSource = ((ProcessEngineConfigurationImpl) processEngine.getProcessEngineConfiguration()).getDataSource();

    try (Connection connection = dataSource.getConnection()) {

      if (readLicenseKeyFromDatasource(connection).isPresent()) {
        return;
      }

      Optional<String> licenseKey = readLicenseKeyFromUrl(camundaBpmProperties.getLicenseFile());
      if (licenseKey.isPresent()) {
        try (PreparedStatement statement = connection.prepareStatement(INSERT_SQL)) {
          statement.setString(1, licenseKey.get());
          statement.execute();
          LOG.enterLicenseKey(camundaBpmProperties.getLicenseFile());
        }
      }
    }
  }

  @SneakyThrows
  static Optional<String> readLicenseKeyFromDatasource(Connection connection) {
    final ResultSet resultSet = connection.createStatement().executeQuery(SELECT_SQL);
    return resultSet.next() ? Optional.ofNullable(resultSet.getString(1)) : Optional.empty();
  }

  @SneakyThrows
  static Optional<String> readLicenseKeyFromUrl(URL licenseFileUrl) {
    Scanner scanner = new Scanner(licenseFileUrl.openStream(), "UTF-8").useDelimiter("\\A");
    Optional<String> key = scanner.hasNext() ? Optional.of(scanner.next()) : Optional.empty();
    return key.map(s -> s.split("---------------")[2]).map(s -> s.replaceAll("\\n", ""));
  }

}
