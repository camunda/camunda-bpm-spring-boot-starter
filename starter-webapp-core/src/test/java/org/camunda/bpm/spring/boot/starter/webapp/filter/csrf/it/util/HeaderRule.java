/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.camunda.bpm.spring.boot.starter.webapp.filter.csrf.it.util;

import org.apache.commons.io.IOUtils;
import org.junit.rules.ExternalResource;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

public class HeaderRule extends ExternalResource {

  protected HttpURLConnection connection = null;

  @Override
  protected void after() {
    connection = null;
  }

  public URLConnection performRequest(String url) {
    return performRequest(url, null);
  }

  public URLConnection performPostRequest(String url) {
    return performRequest(url, "POST");
  }

  public URLConnection performRequest(String url, String method) {
    try {
      connection =
        (HttpURLConnection) new URL(url)
          .openConnection();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    if ("POST".equals(method)) {
      try {
        connection.setRequestMethod("POST");
      } catch (ProtocolException e) {
        throw new RuntimeException(e);
      }
    }

    try {
      connection.connect();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    return connection;
  }

  public List<String> getCookieHeaders() {
    Map<String, List<String>> headerFields = connection.getHeaderFields();
    return headerFields.get("Set-Cookie");
  }

  public String getHeaderXsrfToken() {
    return connection.getHeaderField("X-XSRF-TOKEN");
  }

  public String getXsrfTokenHeader(URLConnection connection) {
    return getHeaderXsrfToken();
  }

  public String getXsrfCookieValue(URLConnection connection) {
    List<String> cookies = getCookieHeaders();

    for (String cookie : cookies) {
      if (cookie.startsWith("XSRF-TOKEN=")) {
        return cookie;
      }
    }

    return "";
  }

  public String getResponseBody() {
    try {
      return IOUtils.toString(connection.getInputStream());
    } catch (IOException e) {
      try {
        return IOUtils.toString(connection.getErrorStream());
      } catch (IOException ex) {
        throw new RuntimeException(ex);
      }
    }
  }

}
