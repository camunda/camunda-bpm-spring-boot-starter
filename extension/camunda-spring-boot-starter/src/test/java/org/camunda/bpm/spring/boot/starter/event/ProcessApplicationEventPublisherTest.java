package org.camunda.bpm.spring.boot.starter.event;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.ContextClosedEvent;

@RunWith(MockitoJUnitRunner.class)
public class ProcessApplicationEventPublisherTest {


  @InjectMocks
  private ProcessApplicationEventPublisher processApplicationEventPublisher;

  @Mock
  private ApplicationEventPublisher publisherMock;

  @Mock
  private ApplicationContext applicationContextMock;

  @Test
  public void handleApplicationReadyEventTest() {
    ApplicationReadyEvent applicationReadyEventMock = mock(ApplicationReadyEvent.class);
    processApplicationEventPublisher.handleApplicationReadyEvent(applicationReadyEventMock);
    verify(publisherMock).publishEvent(Mockito.any(ProcessApplicationStartedEvent.class));
  }

  @Test
  public void handleContextStoppedEventTest() {
    processApplicationEventPublisher.setApplicationContext(applicationContextMock);
    ContextClosedEvent contextClosedEventMock = mock(ContextClosedEvent.class);
    processApplicationEventPublisher.handleContextStoppedEvent(contextClosedEventMock);

    verify(publisherMock, never()).publishEvent(Mockito.any(ProcessApplicationStoppedEvent.class));

    when(contextClosedEventMock.getApplicationContext()).thenReturn(applicationContextMock);
    processApplicationEventPublisher.handleContextStoppedEvent(contextClosedEventMock);
    verify(publisherMock).publishEvent(Mockito.any(ProcessApplicationStoppedEvent.class));
  }

}
