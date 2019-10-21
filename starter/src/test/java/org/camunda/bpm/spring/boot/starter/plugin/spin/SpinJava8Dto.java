package org.camunda.bpm.spring.boot.starter.plugin.spin;

import java.time.LocalDateTime;

public class SpinJava8Dto {

  protected LocalDateTime dateTime;

  public LocalDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(LocalDateTime dateTime) {
    this.dateTime = dateTime;
  }

}
