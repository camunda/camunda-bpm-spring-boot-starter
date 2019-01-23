package org.camunda.bpm.spring.boot.starter.event;

import org.camunda.bpm.engine.impl.history.event.HistoryEvent;
import org.camunda.bpm.engine.impl.history.handler.HistoryEventHandler;
import org.springframework.context.ApplicationEventPublisher;

import java.util.List;

/**
 * Event handler publishing history events as Spring Events.
 */
public class PublishHistoryEventHandler implements HistoryEventHandler {

  private final ApplicationEventPublisher publisher;

  public PublishHistoryEventHandler(final ApplicationEventPublisher publisher) {
    this.publisher = publisher;
  }

  @Override
  public void handleEvent(HistoryEvent historyEvent) {
    this.publisher.publishEvent(historyEvent);
  }

  @Override
  public void handleEvents(final List<HistoryEvent> eventList) {
    if (eventList != null) {
      eventList.forEach(this::handleEvent);
    }
  }
}
