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
package org.camunda.bpm.spring.boot.starter.configuration.impl.custom;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.camunda.bpm.engine.ManagementService;
import org.camunda.bpm.engine.ProcessEngineException;
import org.camunda.bpm.engine.impl.ManagementServiceImpl;

public class LicenseKeyMethod {

  protected Method method;
  protected ManagementService object;
  protected String parameter;
  
  protected Class<?> parameterType;

  public LicenseKeyMethod(String methodType, ManagementService object, String parameter) throws NoSuchMethodException {
    this.object = object;
    parameterType = methodType.equals("set") ? String.class : null;
    this.parameter = parameter;
    try {
      if(methodType.equals("set")) {
        method = ManagementServiceImpl.class.getDeclaredMethod("setLicenseKey", String.class);
      } else if(methodType.equals("get")){
        method = ManagementServiceImpl.class.getDeclaredMethod("getLicenseKey");
      }
    } catch (SecurityException e) {
      throwException(e);
    }
  }

  public Object invoke() {
    try {
      if (parameter != null) {
        return method.invoke(object, parameter);
      } else {
        return method.invoke(object);
      }
      
    } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
      throwException(e);
    }
    return null;
  }

  private void throwException(Throwable cause) {
    throw new ProcessEngineException(cause);
  }
}
