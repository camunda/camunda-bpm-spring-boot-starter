package org.camunda.bpm.spring.boot.starter.runlistener;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.camunda.bpm.spring.boot.starter.events.ProcessApplicationEventPublisher;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ConfigurableApplicationContext;

@RunWith(MockitoJUnitRunner.class)
public class ProcessEventPublishingRunListenerTest {

  @Mock
  private ConfigurableApplicationContext contextMock;

  @Mock
  private ProcessApplicationEventPublisher processApplicationEventPublisherMock;

  @Test
  public void finishedWithNoExceptionTest() {
    when(contextMock.getBean(ProcessApplicationEventPublisher.class)).thenReturn(processApplicationEventPublisherMock);
    ProcessEventPublishingRunListener processEventPublishingRunListener = new ProcessEventPublishingRunListener(null, null);
    processEventPublishingRunListener.finishedWithNoException(contextMock, null);
    verify(processApplicationEventPublisherMock).publishProcessApplicationStartedEvent(processEventPublishingRunListener);
  }

  @Test
  public void finishedWithNoExceptionButNoPublisherInContextTest() {
    when(contextMock.getBean(ProcessApplicationEventPublisher.class)).thenReturn(null);
    ProcessEventPublishingRunListener processEventPublishingRunListener = new ProcessEventPublishingRunListener(null, null);
    processEventPublishingRunListener.finishedWithNoException(contextMock, null);
    verify(processApplicationEventPublisherMock, times(0)).publishProcessApplicationStartedEvent(processEventPublishingRunListener);
  }
}
