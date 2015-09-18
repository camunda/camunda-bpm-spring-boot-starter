package my.own.custom.spring.boot.project;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import java.util.logging.Logger;

@SpringBootApplication
public class SampleCamundaRestApplication {

  private static Logger logger = Logger.getLogger(SampleCamundaRestApplication.class.getName());

  public static void main(String[] args) throws Exception {
    new SpringApplicationBuilder(SampleCamundaRestApplication.class)
      .run();
  }

}
