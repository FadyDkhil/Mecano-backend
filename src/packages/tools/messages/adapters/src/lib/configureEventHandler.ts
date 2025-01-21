import { EventReceiver } from 'ddd';
import {
  EventHandlerRegistry,
  SymTopicProviderFromEventCtor,
  SymTopicProviderFromEventInstance,
} from 'messages-core';
import { Container } from 'inversify';
import { EventManager } from './EventManager';
import { DefaultTopicProviderFromEvent } from './events/DefaultTopicProviderFromEvent';
import { InMemoryEventHandlerRegistry } from './events/InMemoryEventHandlerRegistry';
import { TopicProviderFromRegistration } from './events/TopicProviderFromRegistration';

export async function configureEventHandler(container: Container, registration: (em: EventManager) => void) {
  const receiver = container.get(EventReceiver);
  const topicProviderFromEvent = new DefaultTopicProviderFromEvent();
  const topicProvider = new TopicProviderFromRegistration(topicProviderFromEvent);
  const registry = new InMemoryEventHandlerRegistry();
  const eventManager = new EventManager(container, receiver, registry, topicProvider);

  container.bind(TopicProviderFromRegistration).toConstantValue(topicProvider);
  container.bind(DefaultTopicProviderFromEvent).toConstantValue(topicProviderFromEvent);
  container.bind(SymTopicProviderFromEventInstance).toConstantValue(topicProviderFromEvent);
  container.bind(SymTopicProviderFromEventCtor).toConstantValue(topicProviderFromEvent);

  container.bind(EventHandlerRegistry).toConstantValue(registry);
  container.bind(EventManager).toConstantValue(eventManager);

  registration(eventManager);

  await eventManager.start();
}
