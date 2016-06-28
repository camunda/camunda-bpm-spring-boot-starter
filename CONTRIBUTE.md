# How to contribute

We love you to contribute to this project by filing bugs, helping others on the [issue tracker](https://github.com/camunda/camunda-bpm-spring-boot-starter/issues), by contributing features/bug fixes through pull requests.


## Creating issues

We use our [issue tracker](https://github.com/camunda/camunda-bpm-spring-boot-starter/issues) for project communication.
When using the issue tracker:

* Be descriptive when creating an issue (what, where, when and how does a problem pop up)?
* Attach steps to reproduce (if applicable)
* Attach code samples, configuration options or stack traces that may indicate a problem
* Be helpful and respect others when commenting

Create a pull request if you would like to have an in-depth discussion about some piece of code.


## Setting up the project locally

The project is using Maven 3 as build tool.  
To build the project by yourself, g oto our cmd line and enter ```mvn clean install``` on the root of the checked out project.  

*Hint for eclipse users:* clone the repo as `camunda-spring-boot-starter-root`

### Maven wrapper

We had some troubles with running the build under newer (3.3.9) maven versions. That's why we now offer the [maven wrapper](https://github.com/takari/maven-wrapper/blob/master/README.md).

just run

    ./mvnw clean package

instead of

    mvn clean package

and the wrapper will automatically download and use a fixed maven version (3.1.1).

## Creating pull requests

We use pull requests for feature discussion and bug fixes. If you are not yet familiar on how to create a pull request, [read this great guide](https://gun.io/blog/how-to-github-fork-branch-and-pull-request).

Some things that make it easier for us to accept your pull requests:

We use http://editorconfig.org in this project. If your IDE supports it, you do not have to add any additional configuration.
If you are not able to use this (unfortunately this applies to all eclipse based IDEs so far), make sure you use the [eclipse formatter](https://github.com/camunda/camunda-bpm-platform/blob/master/settings/eclipse/formatter.xml).

* The code adheres to our conventions
    * spaces instead of tabs
    * single-quotes
    * ...
    * see the [.editorconfig](https://github.com/camunda/camunda-bpm-spring-boot-starter/blob/master/.editorconfig) file
* The code is tested
* The `mvn clean install` build passes including tests
* The work is combined into a single commit

We'd be glad to assist you if you do not get these things right in the first place.
