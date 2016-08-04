package org.camunda.bpm.spring.boot.processor;

import com.google.common.io.ByteSource;
import com.google.testing.compile.JavaFileObjects;
import org.junit.Test;

import javax.tools.StandardLocation;

import static com.google.common.truth.Truth.assert_;
import static com.google.testing.compile.JavaSourceSubjectFactory.javaSource;
import static org.assertj.core.api.Assertions.assertThat;

public class GenerateProcessesXmlProcessorTest {

  @Test
  public void generates_empty_processesXml() throws Exception {
    assert_().about(javaSource())
      .that(JavaFileObjects.forSourceLines("AnnotatedClass", "package annotated;\n" +
        "import org.camunda.bpm.spring.boot.processor.GenerateProcessesXml;\n" +
        "@GenerateProcessesXml\n" +
        "public class AnnotatedClass {\n" +
        "}"))
      .processedWith(new GenerateProcessesXmlProcessor())
      .compilesWithoutError()
      .and()
      .generatesFileNamed(StandardLocation.CLASS_OUTPUT, "", "META-INF/processes.xml")
      .withContents(ByteSource.concat());
  }
}
