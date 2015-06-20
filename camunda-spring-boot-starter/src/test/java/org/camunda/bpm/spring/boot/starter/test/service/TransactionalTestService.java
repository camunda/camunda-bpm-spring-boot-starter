package org.camunda.bpm.spring.boot.starter.test.service;

import org.camunda.bpm.engine.runtime.ProcessInstance;

import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

public interface TransactionalTestService {

  ProcessInstance doOk();

  @Transactional(TxType.REQUIRES_NEW)
  void doThrowing();

}
