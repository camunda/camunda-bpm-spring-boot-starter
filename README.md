# camunda-bpm-spring-boot-starter

<a href="https://maven-badges.herokuapp.com/maven-central/org.camunda.bpm.extension/camunda-bpm-spring-boot-starter"><img align="right" src="https://maven-badges.herokuapp.com/maven-central/org.camunda.bpm.extension/camunda-bpm-spring-boot-starter/badge.svg"/></a>

[![Project Stats](https://www.openhub.net/p/camunda-bpm-spring-boot-starter/widgets/project_thin_badge.gif)](https://www.openhub.net/p/camunda-bpm-spring-boot-starter)

## Get started

The extension is published on maven central, so if you are using maven, just add the dependency:

```xml
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-spring-boot-starter([-rest|-webapp])</artifactId>
  <version>1.2.1</version>
</dependency>
```

and then create a simple process application like this one:

```java
@SpringBootApplication
@ProcessApplication
public class WebappExampleProcessApplication extends SpringBootProcessApplication {

  public static void main(String[] args) {
    SpringApplication.run(WebappExampleProcessApplication.class, args);
  }

}
```

Check out the [Documentation](https://camunda.github.io/camunda-bpm-spring-boot-starter) and the [Examples](https://github.com/camunda/camunda-bpm-spring-boot-starter/tree/master/examples)


## Resources

* [Issue Tracker](https://github.com/camunda/camunda-bpm-spring-boot-starter/issues)
* [Contributing](https://github.com/camunda/camunda-bpm-spring-boot-starter/blob/master/CONTRIBUTE.md)


## Releases

* [Release Notes 1.2.1](https://github.com/camunda/camunda-bpm-spring-boot-starter/milestone/5?closed=1)
* ["Release Notes" 1.2.0](https://blog.camunda.org/post/2016/06/camunda-spring-boot-1.2.0-released/)


## Maintainer

*  _[Oliver Steinhauer](https://github.com/osteinhauer)_
*  _[Jan Galinski](https://github.com/jangalinski)_
*  _[Christian Lipphardt](https://github.com/hawky-4s-)_

## License

* [Apache License, Version 2.0](./LICENSE)

