package com.profi.spring.boot.starter.camunda.test.service;

import java.util.HashMap;
import java.util.Map;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.profi.spring.boot.starter.camunda.test.jpa.domain.TestEntity;
import com.profi.spring.boot.starter.camunda.test.jpa.repository.TestEntityRepository;

@Service
public class TransactionalTestServiceImpl implements TransactionalTestService {

    @Autowired
    private TestEntityRepository testEntityRepository;

    @Autowired
    private RuntimeService runtimeService;

    @Override
    public ProcessInstance doOk() {
        TestEntity entity = new TestEntity();
        entity.setText("text");
        TestEntity testEntity = testEntityRepository.save(entity);
        Map<String, Object> variables = new HashMap<>();
        variables.put("test", testEntity);
        return runtimeService.startProcessInstanceByKey("TestProcess", variables);
    }

    @Override
    public void doThrowing() {
        doOk();
        throw new IllegalStateException();
    }
}
