# How to contribute

First of all, please follow the same [contributing guidelines](https://github.com/camunda/camunda-bpm-platform/blob/master/CONTRIBUTING.md) as for the Camunda BPM Platform.

We have an active discussion forum where we are happy to help/discuss all your "why is this not working", "what am I missing", "do you support this feature" questions. 
Please only file issues here for concrete bug reports and feature requests. Thank you! 
You can find the forum here: https://forum.camunda.org/c/spring-boot-starter

We would love for you to contribute to this project by filing bugs, helping others on the [issue tracker](https://app.camunda.com/jira/browse/CAM) and by contributing features/bug fixes through pull requests. When creating an issue, please add "spring-boot" as a component, so that we can easily track all the issues related to this project.

Before v. 2.3.0, the issues were tracked in GitHub: https://github.com/camunda/camunda-bpm-spring-boot-starter/issues. They are now preserved for the reference. However, please, DON'T create new issues here any more.

## Setting up the project locally

The project uses Maven 3 as build tool.  
To build the project by yourself, go to the command line and enter ```mvn clean install``` in the root of the checked out project.  

*Hint for eclipse users:* clone the repo as `camunda-spring-boot-starter-root`

### Maven wrapper

We had some troubles running the build under newer (3.3.9) maven versions. That's why we now offer the [maven wrapper](https://github.com/takari/maven-wrapper/blob/master/README.md).

just run

    ./mvnw clean package

instead of

    mvn clean package

and the wrapper will automatically download and use a fixed maven version (3.3.1).

*Info*: since 2.0.0, this project builds with Java-8 only.

## Creating pull requests

We use pull requests for feature discussion and bug fixes. If you are not yet familiar on how to create a pull request, [read this great guide](https://gun.io/blog/how-to-github-fork-branch-and-pull-request).

Some things that make it easier for us to accept your pull requests:

We use http://editorconfig.org in this project. If your IDE supports it, you do not have to add any additional configuration.
If you are not able to use this (unfortunately, this applies to all eclipse based IDEs so far), make sure you use the [eclipse formatter](https://github.com/camunda/camunda-bpm-platform/blob/master/settings/eclipse/formatter.xml).

* The code adheres to our conventions
    * spaces instead of tabs
    * single-quotes
    * ...
    * see the [.editorconfig](https://github.com/camunda/camunda-bpm-spring-boot-starter/blob/master/.editorconfig) file
* The code is tested
* The `mvn clean install` build passes including tests
* The work is combined into a single commit

We'd be glad to assist you if you do not get these things right at first.
