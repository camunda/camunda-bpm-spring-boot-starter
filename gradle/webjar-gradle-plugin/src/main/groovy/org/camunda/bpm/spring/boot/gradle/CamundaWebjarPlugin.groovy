package org.camunda.bpm.spring.boot.gradle;

import org.gradle.api.Plugin
import org.gradle.api.Project

class CamundaWebjarPlugin implements Plugin<Project> {

  void apply(Project project) {
    project.configurations {
      camundaEE
    }
    project.dependencies {
      camundaEE 'org.camunda.bpm.webapp:camunda-webapp-ee-plugins:7.6.3-ee@war'
      compile 'org.camunda.bpm.webapp:camunda-webapp-ee-plugins:7.6.3-ee:classes'
    }

    project.task("resolveCamundaEnterpriseWebjar") {
      dependsOn:
      project.configurations.camundaEE

      doLast {
        project.copy {
          from project.configurations.camundaEE.collect { project.zipTree(it) }
          into "$project.buildDir/resources/main"
        }

        project.delete "$project.buildDir/resources/main/META-INF"

        project.copy {
          from "$project.buildDir/resources/main/WEB-INF/securityFilterRules.json"
          into "$project.buildDir/resources/main"
        }

        project.delete "$project.buildDir/resources/main/WEB-INF"
      }
    }
  }
}
