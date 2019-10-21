package org.camunda.bpm.springboot.project.qa.spin;

import java.sql.Date;

public class SpinDto {

  protected Date dateTime;

  public Date getDateTime() {
    return dateTime;
  }

  public void setDateTime(Date dateTime) {
    this.dateTime = dateTime;
  }

}
