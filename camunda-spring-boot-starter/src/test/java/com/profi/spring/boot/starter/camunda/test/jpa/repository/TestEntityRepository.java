package com.profi.spring.boot.starter.camunda.test.jpa.repository;

import org.springframework.data.repository.CrudRepository;

import com.profi.spring.boot.starter.camunda.test.jpa.domain.TestEntity;

public interface TestEntityRepository extends CrudRepository<TestEntity, Long> {

}
