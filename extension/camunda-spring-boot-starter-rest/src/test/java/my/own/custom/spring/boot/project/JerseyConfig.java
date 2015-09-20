package my.own.custom.spring.boot.project;

import org.camunda.bpm.spring.boot.starter.rest.CamundaJerseyResourceConfig;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.ws.rs.ApplicationPath;

@Component
@ApplicationPath("/rest")
public class JerseyConfig extends CamundaJerseyResourceConfig {

  @PostConstruct
  public void init() {
    register(ProcessStartService.class);
  }

}
