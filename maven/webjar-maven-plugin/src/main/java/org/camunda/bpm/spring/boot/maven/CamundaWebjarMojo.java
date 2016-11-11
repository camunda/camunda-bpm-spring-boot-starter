package org.camunda.bpm.spring.boot.maven;


import org.apache.maven.execution.MavenSession;
import org.apache.maven.model.Dependency;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.BuildPluginManager;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.apache.maven.plugins.annotations.Component;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.project.MavenProject;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.apache.maven.plugins.annotations.LifecyclePhase.GENERATE_SOURCES;
import static org.apache.maven.plugins.annotations.ResolutionScope.COMPILE_PLUS_RUNTIME;
import static org.twdata.maven.mojoexecutor.MojoExecutor.*;

@Mojo(
  name = "create",
  defaultPhase = GENERATE_SOURCES,
  requiresDependencyResolution = COMPILE_PLUS_RUNTIME
)
public class CamundaWebjarMojo extends AbstractMojo {

  public static final String WEBJAR_PATH = "/META-INF/resources/webjars/camunda";

  @Parameter(property = "project", required = true, readonly = true)
  protected MavenProject project;

  @Parameter(property = "camunda.version", required = true)
  protected String camundaVersion;

  @Parameter(property = "webjar.path", required = true, defaultValue = WEBJAR_PATH)
  protected String webjarPath;

  @Parameter(property = "webjar.outputDirectory")
  protected String webJarOutputDirectory;

  @Parameter(property = "session", required = true, readonly = true)
  protected MavenSession session;

  @Component
  protected BuildPluginManager buildPluginManager;

  private final List<Dependency> dependencies = new ArrayList<>();

  @Override
  public void execute() throws MojoExecutionException, MojoFailureException {

    final String target = target(Optional.ofNullable(webJarOutputDirectory), project.getBuild().getOutputDirectory(), webjarPath);
    getLog().info("Creating camunda-webjar: " + target);

    executeMojo(plugin(groupId("org.apache.maven.plugins"), artifactId("maven-dependency-plugin"), version("2.10"), dependencies), goal("unpack"),
      configuration(
        element("artifactItems",
          element("artifactItem",
            element("groupId", "org.camunda.bpm.webapp"),
            element("artifactId", "camunda-webapp"),
            element("version", camundaVersion),
            element("type", "war"),
            element("overWrite", "true"),
            element("outputDirectory", target),
            element("excludes", "META-INF/**")
          )
        )
      ), executionEnvironment(project, session, buildPluginManager));

    executeMojo(plugin(groupId("org.apache.maven.plugins"), artifactId("maven-antrun-plugin"), version("1.8"), dependencies), goal("run"),
      configuration(
        element("target",
          element("move",
            attributes(
              attribute("file", target + "/WEB-INF/securityFilterRules.json"),
              attribute("toDir", target)
            )
          ),
          element("delete",
            attributes(
              attribute("dir", target + "/WEB-INF")
            )
          )
        )
      ), executionEnvironment(project, session, buildPluginManager));
  }

  static String target(Optional<String> configuredOutput, String defaultOutput, String webjarPath) {
    return Optional.of(webjarPath)
      .map(s -> !s.startsWith("/") ? "/" + s : s)
      .map(s -> configuredOutput.orElse(defaultOutput) + s)
      .get();
  }
}
