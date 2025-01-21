import {DomainEvent, DomainEventProducer, EventDispatcher, EventErrors} from 'ddd';
import {EventMetadata, EventRepository} from 'messages-core';
import { v4 } from 'uuid';

export class InMemoryDispatcher implements EventDispatcher {
  constructor(
    private readonly _eventRepository: EventRepository,
  ) {}

  async dispatch(domainEventProducer: DomainEventProducer, partitionKey?: string): Promise<void> {
    const partitionKeyId = partitionKey || v4();
    const events = domainEventProducer.getEvents();
    if (!events.length) {
      throw new EventErrors.DomainEventsMapEmpty('Please provide core event before dispatch');
    }
    for (const domainEvent of events) {
      await this.publish(domainEvent, partitionKeyId);
    }
    return domainEventProducer.clearEvents();
  }

  async dispatchEvent(event: DomainEvent, partitionKey?: string): Promise<void> {
    const partitionKeyId = partitionKey || v4();
    await this.publish(event, partitionKeyId);
    return;
  }

  private async publish(domainEvent: DomainEvent, partitionKeyId?: string) {
    const metadata = EventMetadata.getFromInstance(domainEvent);
    const eventName = metadata.name;
    const timestamp = Date.now();
    const message = {
      body: {
        props: {
          ...domainEvent.props,
        },
        metadata: {
          ...domainEvent.metadata,
          sentAt: new Date(timestamp),
          id: domainEvent.id,
          timestamp,
        },
      },
      label: eventName,
      messageId: domainEvent.id,
      handlers: [],
      succeed: false,
      handledAt: null,
      retryCount: 0,
      handlerErrors: [],
    }
    console.debug(`[InMemoryDispatcher] dispatch event ${eventName}`, message);
    await this._eventRepository.save(message);
  }
}
