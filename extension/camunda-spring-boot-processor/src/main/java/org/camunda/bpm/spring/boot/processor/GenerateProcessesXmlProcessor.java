package org.camunda.bpm.spring.boot.processor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.PackageElement;
import javax.lang.model.element.TypeElement;
import javax.tools.Diagnostic;
import javax.tools.FileObject;
import javax.tools.JavaFileManager;
import javax.tools.JavaFileObject;
import javax.tools.StandardLocation;
import java.io.IOException;
import java.io.Writer;
import java.util.Set;

import static javax.tools.Diagnostic.Kind.NOTE;

@SupportedAnnotationTypes("org.camunda.bpm.spring.boot.processor.GenerateProcessesXml")
@SupportedSourceVersion(SourceVersion.RELEASE_6)
public class GenerateProcessesXmlProcessor extends AbstractProcessor {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Override
  public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
    if (!doGenerate(roundEnv)) {
      return false;
    }
    Writer writer = null;
    try {
      final FileObject resource = processingEnv.getFiler().createResource(StandardLocation.CLASS_OUTPUT, "", "META-INF/processes.xml");
      writer = resource.openWriter();
      writer.write("");
      writer.close();

      logger.info("generated empty META-INF/processes.xml");

      processingEnv.getMessager().printMessage(NOTE, "generated empty META-INF/processes.xml");
      return true;
    } catch (IOException e) {
      logger.error(e.getMessage());
      return false;
    } finally {
      if (writer != null) {
        try {
          writer.close();
        } catch (IOException e) {
          logger.error(e.getMessage());
        }
      }
    }
  }


  private boolean doGenerate(RoundEnvironment roundEnv) {
    for (final Element element : roundEnv.getElementsAnnotatedWith(GenerateProcessesXml.class)) {
      if (element instanceof TypeElement) {
        return true;
      }
    }
    return false;
  }
}
