package org.camunda.bpm.spring.boot.starter.property;


import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadFactory;

public final class Defaults extends SpringProcessEngineConfiguration {

  public static ThreadPoolTaskExecutor TASK_EXECUTOR = new ThreadPoolTaskExecutor() {
    @Override
    protected ExecutorService initializeExecutor(ThreadFactory threadFactory, RejectedExecutionHandler rejectedExecutionHandler) {
      throw new UnsupportedOperationException("use only for default values!");
    }

    @Override
    protected BlockingQueue<Runnable> createQueue(int queueCapacity) {
      throw new UnsupportedOperationException("use only for default values!");
    }

    @Override
    public void execute(Runnable task) {
      throw new UnsupportedOperationException("use only for default values!");
    }

    @Override
    public void execute(Runnable task, long startTimeout) {
      throw new UnsupportedOperationException("use only for default values!");
    }

    @Override
    public Future<?> submit(Runnable task) {
      throw new UnsupportedOperationException("use only for default values!");
    }

    @Override
    public <T> Future<T> submit(Callable<T> task) {
      throw new UnsupportedOperationException("use only for default values!");
    }

    @Override
    public ListenableFuture<?> submitListenable(Runnable task) {
      throw new UnsupportedOperationException("use only for default values!");
    }
  };

  public static final Defaults INSTANCE = new Defaults();

  private Defaults() {

  }

  @Override
  public ProcessEngine buildProcessEngine() {
    throw new UnsupportedOperationException("use only for default values!");
  }
}
