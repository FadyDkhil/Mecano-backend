import { Container } from 'inversify';
import { EventDispatcher } from '../domain/services/EventDispatcher';
import { EventReceiver } from '../domain/services/EventReceiver';
import { MessagingPlugin } from '../domain/services/MessagingPlugin';

export function buildDomainEventDependencies(container: Container) {
  return {
    usePlugin(messagingPlugin: MessagingPlugin) {
      container.bind(EventDispatcher).toConstantValue(messagingPlugin.dispatcher);
      container.bind(EventReceiver).toConstantValue(messagingPlugin.receiver);
    },
  };
}
