package org.camunda.bpm.spring.boot.starter;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.repository.Deployment;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareAssertions;
import org.camunda.bpm.engine.variable.Variables;
import org.camunda.bpm.engine.variable.value.ObjectValue;
import org.camunda.bpm.engine.variable.value.TypedValue;
import org.camunda.bpm.model.bpmn.Bpmn;
import org.camunda.bpm.model.bpmn.BpmnModelInstance;
import org.camunda.bpm.spring.boot.starter.AdditionalCammundaBpmConfigurations.AfterStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.AdditionalCammundaBpmConfigurations.BeforeStandardConfiguration;
import org.camunda.bpm.spring.boot.starter.property.CamundaBpmProperties;
import org.camunda.bpm.spring.boot.starter.test.TestApplication;
import org.camunda.bpm.spring.boot.starter.util.CamundaSpringBootUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.Serializable;
import java.util.Date;

import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareAssertions.assertThat;
import static org.camunda.bpm.engine.variable.Variables.SerializationDataFormats.JSON;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(
  classes = TestApplication.class,
  webEnvironment = WebEnvironment.NONE,
  properties = {
    "camunda.bpm.default-serialization-format=application/json"
  }
)
public class CamundaSerializationFormatIT extends AbstractCamundaAutoConfigurationIT {


  public static class Data implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private Date created;

    public Data() {
    }

    public Data(String name) {
      this(name, new Date());
    }


    public Data(String name, Date created) {
      this.name = name;
      this.created = created;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public Date getCreated() {
      return created;
    }

    public void setCreated(Date created) {
      this.created = created;
    }
  }

  @Autowired
  protected ProcessEngine processEngine;

  @Autowired
  protected CamundaBpmProperties properties;

  private Deployment deployment;

  @Before
  public void setUp() throws Exception {
    BpmnModelInstance process = Bpmn.createExecutableProcess("CamundaSerializationFormatIT")
      .startEvent()
      .userTask("task")
      .endEvent()
      .done();

    deployment = repositoryService.createDeployment().addModelInstance("CamundaSerializationFormatIT.bpmn", process).deploy();

  }

  @After
  public void tearDown() throws Exception {
    repositoryService.deleteDeployment(deployment.getId(), true);
  }

  @Test
  public void configured_format_is_json() throws Exception {
    assertThat(properties.getDefaultSerializationFormat()).isEqualTo(JSON.getName());

    String format = CamundaSpringBootUtil.get(processEngine).getDefaultSerializationFormat();

    assertThat(format).isEqualTo(JSON.getName());
  }

  @Test
  public void get_and_set_json_variable() {
    ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("CamundaSerializationFormatIT");

    assertThat(processInstance).isWaitingAt("task");

    Data data = new Data("myData");



    runtimeService.setVariable(processInstance.getId(), "complexData", data);

    ObjectValue complexData = runtimeService.getVariableTyped(processInstance.getId(), "complexData");

    assertThat(complexData.getSerializationDataFormat()).isEqualTo(JSON.getName());

    Data d2 = (Data) complexData.getValue();

    assertThat(d2.getName()).isEqualTo("myData");
    assertThat(d2.getCreated()).isInSameSecondWindowAs(new Date());

  }
}
