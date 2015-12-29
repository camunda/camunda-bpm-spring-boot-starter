package org.camunda.bpm.spring.boot.starter.webapp.filter;

import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.camunda.bpm.spring.boot.starter.webapp.filter.LazyDelegateFilter.InitHook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ConfigurableApplicationContext;

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
    when(context.getBean("resourceLoaderDependingInitHook", InitHook.class)).thenReturn(initHookMock);
    listener.finished(context, null);

    InOrder order = inOrder(LazySecurityFilter.INSTANCE, LazyProcessEnginesFilter.INSTANCE);
    order.verify(LazySecurityFilter.INSTANCE).setInitHook(initHookMock);
    order.verify(LazySecurityFilter.INSTANCE).lazyInit();
    order.verify(LazyProcessEnginesFilter.INSTANCE).setInitHook(initHookMock);
    order.verify(LazyProcessEnginesFilter.INSTANCE).lazyInit();
  }
}
