package org.camunda.bpm.spring.boot.starter.generic;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Constraint(validatedBy = GenericProcessEnginePropertiesValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME) @interface ValidGenericProcessEngineProperties {
  String message()

  default "";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}