import { DomainEvent, DomainEventHandler, EventErrors, EventReceiver, SubscriptionInfo } from 'ddd';
import { EventRepository } from "messages-core";

export class InMemoryReceiver implements EventReceiver {
  private _domainEventMap: Map<string, DomainEventHandler<any>[]>;

  constructor(
    private readonly _eventRepository: EventRepository,
  ) {
    this._domainEventMap = new Map();
  }

  async subscribe<T extends DomainEvent>(
    info: SubscriptionInfo,
    domainEventHandler: DomainEventHandler<T>,
  ): Promise<void> {
    const eventName = info.eventName;
    const version = info.version;
    const eventHandlers = [];
    eventHandlers.push(domainEventHandler);
    const handlers = this._domainEventMap.get(eventName);
    if (handlers) {
      for (const handler of handlers) {
        eventHandlers.push(handler);
      }
    }
    this._domainEventMap.set(eventName, [...new Set(eventHandlers)]);
    if (!eventName || !version) {
      throw new EventErrors.MissingEventAttributes('Do not forget to set Event decorator in your event');
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async start(): Promise<void> {
      while(true) {
        const messages = await this._eventRepository.getQueue();
        console.log(`messages to acknowledge ${JSON.stringify({
          count: messages.length,
        })}`);
        const handlerErrors = [];
        const handlerSuccess = [];
        for (const message of messages) {
          const handledMessage = message;
          const eventMessage = handledMessage.body;
          const channel = handledMessage.label;
          const messageHandler = this._domainEventMap.get(channel);
          const messageId = eventMessage.metadata['id'];
          if (!messageHandler) {
            await this._eventRepository.save({
              messageId: messageId,
              handlers: [],
              succeed: true,
              handledAt: new Date(),
              handlerErrors: [],
              retryCount: 0,
              body: eventMessage,
              label: channel,
            })
            console.log(`no handler attached to the event ${channel} with ${messageId}`)
            continue;
          }
          const handlers = messageHandler.filter(item => !message.handlers.includes(item.constructor.name));

          for (const handler of handlers) {
            try {
              console.debug(
                  `[InMemoryReceiver] receiving event ${channel} handled by ${handler.constructor.name} with ${messageId}`,
              );
              await handler.handle({
                id: messageId,
                props: eventMessage.props,
                metadata: eventMessage.metadata,
                timestamp: eventMessage.metadata['timestamp'],
                sentAt: new Date(eventMessage.metadata['timestamp']),
              });
              console.debug(
                  `[InMemoryReceiver] event ${channel} successfully handled by ${handler.constructor.name}`,
              );
              handlerSuccess.push(handler.constructor.name);
            } catch (e) {
              console.error(
                  `[InMemoryReceiver] error occured on handler ${
                      handler.constructor.name
                  } while handling event ${channel} with properties ${JSON.stringify(eventMessage.props)}`,
                  e,
              );
              handlerErrors.push({
                name: handler.constructor.name,
                error: e,
              })
            }
          }
          await this._eventRepository.save({
            ...handledMessage,
            messageId: messageId,
            handlers: handlerSuccess,
            succeed: handlerErrors.length === 0,
            handledAt: new Date(),
            handlerErrors: handlerErrors,
            retryCount: message.retryCount + 1,
          })
        }
        await this.delay(5000)
      }
  }
}
