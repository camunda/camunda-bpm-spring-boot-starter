package org.camunda.bpm.spring.boot.starter.events;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.ContextClosedEvent;

@RunWith(MockitoJUnitRunner.class)
public class ProcessApplicationEventPublisherTest {

  @Mock
  private ApplicationEventPublisher publisherMock;

  @Mock
  private ApplicationContext applicationContextMock;

  @Test
  public void handleApplicationReadyEventTest() {
    ProcessApplicationEventPublisher processApplicationEventPublisher = spy(new ProcessApplicationEventPublisher(publisherMock));
    ApplicationReadyEvent applicationReadyEventMock = mock(ApplicationReadyEvent.class);
    processApplicationEventPublisher.handleApplicationReadyEvent(applicationReadyEventMock);
    verify(processApplicationEventPublisher).publishProcessApplicationEvent(Mockito.any(ProcessApplicationStartedEvent.class));
  }

  @Test
  public void handleContextStoppedEventTest() {
    ProcessApplicationEventPublisher processApplicationEventPublisher = spy(new ProcessApplicationEventPublisher(publisherMock));
    processApplicationEventPublisher.setApplicationContext(applicationContextMock);
    ContextClosedEvent contextClosedEventMock = mock(ContextClosedEvent.class);
    processApplicationEventPublisher.handleContextStoppedEvent(contextClosedEventMock);
    verify(processApplicationEventPublisher, times(0)).publishProcessApplicationEvent(Mockito.any(ProcessApplicationStoppedEvent.class));

    when(contextClosedEventMock.getApplicationContext()).thenReturn(applicationContextMock);
    processApplicationEventPublisher.handleContextStoppedEvent(contextClosedEventMock);
    verify(processApplicationEventPublisher).publishProcessApplicationEvent(Mockito.any(ProcessApplicationStoppedEvent.class));
  }

}
