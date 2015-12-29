package org.camunda.bpm.spring.boot.starter.webapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

  @RequestMapping("/")
  String index() {
    return "index.html";
  }
}
