/*
 * Copyright © 2015-2018 camunda services GmbH and various authors (info@camunda.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
package my.own.custom.spring.boot.project;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.rest.dto.runtime.ProcessInstanceDto;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/process/start")
public class ProcessStartService {

  @Autowired
  private RuntimeService runtimeService;

  @POST
  public ProcessInstanceDto startProcess() {
    ProcessInstance testProcess = runtimeService.startProcessInstanceByKey("TestProcess");
    return ProcessInstanceDto.fromProcessInstance(testProcess);
  }

}
