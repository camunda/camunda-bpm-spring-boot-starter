package org.camunda.bpm.spring.boot.starter.webapp.filter;

import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ConfigurableApplicationContext;

import static org.mockito.Matchers.anyList;

import static org.camunda.bpm.engine.impl.metrics.parser.MetricsCmmnTransformListener.listener;

@RunWith(MockitoJUnitRunner.class)
public class LazyFilterRuntimeListenerTest {
  @Mock
  private ConfigurableApplicationContext context;

  @Mock
  private InitHook<ResourceLoaderDependingFilter> initHookMock;

  @Test
  public void finishedTest() {
    LazySecurityFilter.INSTANCE = mock(LazySecurityFilter.class);
    LazyProcessEnginesFilter.INSTANCE = mock(LazyProcessEnginesFilter.class);

    LazyFilterRuntimeListener listener = new LazyFilterRuntimeListener(null, null);
    when(context.containsBean("resourceLoaderDependingInitHook")).thenReturn(true);
    when(context.getBean("resourceLoaderDependingInitHook", InitHook.class)).thenReturn(initHookMock);
    listener.finished(context, null);

    InOrder order = inOrder(LazySecurityFilter.INSTANCE, LazyProcessEnginesFilter.INSTANCE);
    order.verify(LazySecurityFilter.INSTANCE).setInitHook(initHookMock);
    order.verify(LazySecurityFilter.INSTANCE).lazyInit();
    order.verify(LazyProcessEnginesFilter.INSTANCE).setInitHook(initHookMock);
    order.verify(LazyProcessEnginesFilter.INSTANCE).lazyInit();
  }

  @Test
  public void finishedWithoutInitHookTest() {
    LazySecurityFilter.INSTANCE = mock(LazySecurityFilter.class);
    LazyProcessEnginesFilter.INSTANCE = mock(LazyProcessEnginesFilter.class);

    LazyFilterRuntimeListener listener = new LazyFilterRuntimeListener(null, null);
    when(context.containsBean("resourceLoaderDependingInitHook")).thenReturn(false);
    listener.finished(context, null);

    verify(context, never()).getBean("resourceLoaderDependingInitHook");
    verify(LazySecurityFilter.INSTANCE, never()).setInitHook(initHookMock);
    verify(LazySecurityFilter.INSTANCE, never()).lazyInit();
    verify(LazyProcessEnginesFilter.INSTANCE, never()).setInitHook(initHookMock);
    verify(LazyProcessEnginesFilter.INSTANCE, never()).lazyInit();
  }
}
