package org.camunda.bpm.spring.boot.gradle;

import org.gradle.api.Plugin
import org.gradle.api.Project

class CamundaWebjarPlugin implements Plugin<Project> {

  void apply(Project project) {
    def myExt = project.extensions.create("camundaWebjarPlugin", CamundaWebjarPluginExtension)

    project.configurations {
      extendsFrom compile
    }

    project.task("resolveCamundaEnterpriseWebjar") {

      doLast {
        project.configurations.camundaEE.dependencies.add(project.dependencies.create("org.camunda.bpm.webapp:camunda-webapp-ee-plugins:$myExt.camundaVersion@war"))

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

class CamundaWebjarPluginExtension {
  String camundaVersion
}
