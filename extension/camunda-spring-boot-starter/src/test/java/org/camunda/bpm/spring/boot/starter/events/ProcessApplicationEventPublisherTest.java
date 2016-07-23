package org.camunda.bpm.spring.boot.starter.events;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationEventPublisher;

@RunWith(MockitoJUnitRunner.class)
public class ProcessApplicationEventPublisherTest {

  @Mock
  private ApplicationEventPublisher publisherMock;

  @Test
  public void handleApplicationReadyEventTest() {
    ProcessApplicationEventPublisher processApplicationEventPublisher = spy(new ProcessApplicationEventPublisher(publisherMock));
    ApplicationReadyEvent applicationReadyEventMock = mock(ApplicationReadyEvent.class);
    processApplicationEventPublisher.handleApplicationReadyEvent(applicationReadyEventMock);
    verify(processApplicationEventPublisher).publishProcessApplicationStartedEvent(applicationReadyEventMock);
  }

  @Test
  public void publishProcessApplicationStartedEventTest() {
    ProcessApplicationEventPublisher processApplicationEventPublisher = spy(new ProcessApplicationEventPublisher(publisherMock));
    ProcessApplicationStartedEvent event = new ProcessApplicationStartedEvent(this);
    when(processApplicationEventPublisher.createNewEvent(this)).thenReturn(event);
    processApplicationEventPublisher.publishProcessApplicationStartedEvent(this);
    verify(publisherMock).publishEvent(event);
  }

  @Test
  public void createNewEventTest() {
    ProcessApplicationEventPublisher processApplicationEventPublisher = new ProcessApplicationEventPublisher(publisherMock);
    Object source1 = new Object();
    Object source2 = new Object();
    ProcessApplicationStartedEvent event1 = processApplicationEventPublisher.createNewEvent(source1);
    ProcessApplicationStartedEvent event2 = processApplicationEventPublisher.createNewEvent(source2);

    assertNotSame(event1, event2);
    assertEquals(source1, event1.getSource());
    assertEquals(source2, event2.getSource());
  }
}
