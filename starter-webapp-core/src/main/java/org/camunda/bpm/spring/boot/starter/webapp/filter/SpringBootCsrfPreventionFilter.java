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
package org.camunda.bpm.spring.boot.starter.webapp.filter;

import org.camunda.bpm.engine.rest.exception.InvalidRequestException;
import org.camunda.bpm.webapp.impl.security.filter.CsrfPreventionFilter;
import org.camunda.bpm.webapp.impl.security.filter.util.CsrfConstants;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.Response;

/**
 * Wrapper class for the CSRF Prevention filter to ensure that
 * the root context path in the Camunda Spring Boot Starter Webapps
 * doesn't break the CSRF protection.
 *
 * @author Nikola Koevski
 */
public class SpringBootCsrfPreventionFilter extends CsrfPreventionFilter {

  @Override
  protected void setCSRFToken(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession();
    Object sessionMutex = getSessionMutex(session);

    if (session.getAttribute(CsrfConstants.CSRF_TOKEN_SESSION_ATTR_NAME) == null) {

      synchronized (sessionMutex) {

        if (session.getAttribute(CsrfConstants.CSRF_TOKEN_SESSION_ATTR_NAME) == null) {
          String token = generateCSRFToken();

          Cookie csrfCookie = getCSRFCookie(request);
          csrfCookie.setValue(token);

          String contextPath = "/";
          if (!request.getContextPath().isEmpty()) {
            contextPath = request.getContextPath();
          }
          csrfCookie.setPath(contextPath);

          session.setAttribute(CsrfConstants.CSRF_TOKEN_SESSION_ATTR_NAME, token);
          response.addCookie(csrfCookie);
          response.setHeader(CsrfConstants.CSRF_TOKEN_HEADER_NAME, token);
        }
      }
    }
  }

  protected Object getSessionMutex(HttpSession session) {
    if (session == null) {
      throw new InvalidRequestException(Response.Status.BAD_REQUEST, "HttpSession is missing");
    }

    Object mutex =  session.getAttribute(CsrfConstants.CSRF_SESSION_MUTEX);
    if (mutex == null) {
      mutex = session;
    }

    return mutex;
  }

  protected Cookie getCSRFCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals(CsrfConstants.CSRF_TOKEN_COOKIE_NAME)) {
          return cookie;
        }
      }
    }

    return new Cookie(CsrfConstants.CSRF_TOKEN_COOKIE_NAME, null);
  }
}
