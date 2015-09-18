package my.own.custom.spring.boot.project;

import org.camunda.bpm.spring.boot.starter.CamundaBpmRestConfiguration;
import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;

@Component
@ApplicationPath("/rest")
public class JerseyConfig extends CamundaBpmRestConfiguration.CamundaJerseyConfig {

  public JerseyConfig() {
    super();

    register(ProcessStartService.class);
  }

}
