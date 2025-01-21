import 'reflect-metadata';
import { DomainEvent, DomainEventHandler, EventReceiver, SubscriptionInfo } from 'ddd';
import { EventHandler, EventHandlerRegistry, DecoratedEvent } from 'messages-core';
import { Container, injectable } from 'inversify';
import { DefaultTopicProviderFromEvent } from '../events/DefaultTopicProviderFromEvent';
import { TopicProviderFromRegistration } from '../events/TopicProviderFromRegistration';
import { EventManager } from '../EventManager';
import { InMemoryEventHandlerRegistry } from '../events/InMemoryEventHandlerRegistry';

describe('EventManager', () => {
  let container: Container;
  let eventReceiver: EventReceiverStub;
  let eventHandlerRegistry: EventHandlerRegistry;
  let topicProviderFromRegistration: TopicProviderFromRegistration;
  let eventManager: EventManager;

  class EventReceiverStub implements EventReceiver {
    public info: SubscriptionInfo;
    public eventDomainHandler: EventHandler<DomainEvent>;

    public subscribe<T extends DomainEvent>(
      info: SubscriptionInfo,
      eventDomainHandler: EventHandler<T>,
    ): Promise<void> {
      this.info = info;
      this.eventDomainHandler = eventDomainHandler;

      return Promise.resolve();
    }
    start(): Promise<void> {
      return Promise.resolve();
    }
  }

  beforeEach(() => {
    container = new Container();
    eventReceiver = new EventReceiverStub();
    eventHandlerRegistry = new InMemoryEventHandlerRegistry();
    const topicProviderFromEvent = new DefaultTopicProviderFromEvent();
    topicProviderFromRegistration = new TopicProviderFromRegistration(topicProviderFromEvent);

    eventManager = new EventManager(
      container,
      eventReceiver,
      eventHandlerRegistry,
      topicProviderFromRegistration,
    );
  });

  it('should work', async () => {
    @DecoratedEvent({
      namespace: '@django/test',
      name: 'TestEvent',
      version: 0,
    })
    class TestEvent implements DomainEvent<any> {
      public id: string;
      public props: any;
    }

    @injectable()
    class TestEventHandler extends DomainEventHandler<TestEvent> {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      public handle(domainEvent: TestEvent): Promise<void> {
        return Promise.resolve();
      }
    }

    eventManager.register(TestEvent, TestEventHandler);

    await eventManager.start();

    expect(eventReceiver.info).toEqual({
      channel: '@django/test',
      eventName: 'TestEvent',
      version: 0,
    });
  });
});
