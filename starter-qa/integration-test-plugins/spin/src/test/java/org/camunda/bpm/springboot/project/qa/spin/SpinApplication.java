package org.camunda.bpm.springboot.project.qa.spin;

import static org.camunda.spin.Spin.S;

import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.json.SpinJsonNode;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpinApplication {

  @Bean
  public JavaDelegate spinJava8DeserializerDelegate() {
    return delegateExecution -> {
      SpinJsonNode jsonNode = S("{\"dateTime\": \"2019-12-12T22:22:22\"}");
      Object         key      = jsonNode.mapTo(SpinJava8Dto.class);
    };
  }

  @Bean
  public JavaDelegate spinDeserializerDelegate() {
    return delegateExecution -> {
      SpinJsonNode jsonNode = S("{\"dateTime\": \"2019-12-12T22:22:22\"}");
      Object         key      = jsonNode.mapTo(SpinDto.class);
      delegateExecution.setVariable("dateTime", key);
    };
  }
}
