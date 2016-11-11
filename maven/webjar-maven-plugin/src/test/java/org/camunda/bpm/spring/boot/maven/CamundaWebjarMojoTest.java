package org.camunda.bpm.spring.boot.maven;


import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.camunda.bpm.spring.boot.maven.CamundaWebjarMojo.WEBJAR_PATH;
import static org.camunda.bpm.spring.boot.maven.CamundaWebjarMojo.target;
import static org.junit.Assert.assertEquals;

@RunWith(Enclosed.class)
public class CamundaWebjarMojoTest {

  @RunWith(Parameterized.class)
  public static class CreateTarget {

    @Parameterized.Parameters(name = "{index} target({0}, {1}, {2})={3}")
    public static List<Object[]> parameters() {
      return Arrays.asList(new Object[][]{
        {Optional.empty(), "classes", WEBJAR_PATH, "classes"+WEBJAR_PATH},
        {Optional.empty(), "classes", "foo", "classes/foo"},
        {Optional.of("test-classes"), "classes", WEBJAR_PATH, "test-classes"+WEBJAR_PATH},
        {Optional.of("test-classes"), "classes", "foo", "test-classes/foo"},
      });
    }

    @Parameterized.Parameter(0)
    public Optional<String> webJarOutputDirectory;
    @Parameterized.Parameter(1)
    public String defaultOutputDirectory;
    @Parameterized.Parameter(2)
    public String webjarPath;
    @Parameterized.Parameter(3)
    public String expected;


    @Test
    public void createTarget() throws Exception {
      assertEquals(expected, target(webJarOutputDirectory, defaultOutputDirectory,webjarPath));
    }
  }

}
