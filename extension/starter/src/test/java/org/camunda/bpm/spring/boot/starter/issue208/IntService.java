package org.camunda.bpm.spring.boot.starter.issue208;

import org.springframework.stereotype.Service;

/**
 * Created by Andrew Eleneski on 2/13/2017.
 */
@Service
public class IntService {

  public int testIntServiceMethod(){
    System.out.println("\n\n\nMethod A");

    return 5;
  }
}
