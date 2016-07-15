package my.own.custom.spring.boot.project;

import javax.annotation.PostConstruct;
import javax.ws.rs.ApplicationPath;

import org.camunda.bpm.spring.boot.starter.rest.CamundaJerseyResourceConfig;
import org.springframework.stereotype.Component;

@Component
@ApplicationPath("/rest")
public class JerseyConfig extends CamundaJerseyResourceConfig {

  @PostConstruct
  public void init() {
    register(ProcessStartService.class);
  }

}
