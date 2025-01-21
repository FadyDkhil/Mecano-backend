import { Container } from 'inversify';
import { buildDomainEventDependencies, MessagingPlugin } from 'ddd';
import { configureEventHandler } from '../configureEventHandler';
import { EventManager } from '../EventManager';
import {InMemoryDispatcher} from "../plugins/inmemory/InMemoryDispatcher";
import {InMemoryReceiver} from "../plugins/inmemory/InMemoryReceiver";
import {EventRepository} from "messages-core";


export class MessageModule {
  messagingPlugin: MessagingPlugin;

  constructor(private readonly _container: Container) {}

  configure(config: {
    dataSource: EventRepository,
  }) {
    this.messagingPlugin = {
      dispatcher: new InMemoryDispatcher(config.dataSource),
      receiver: new InMemoryReceiver(config.dataSource)
    }

    buildDomainEventDependencies(this._container).usePlugin(
      this.messagingPlugin
    );
    return this;
  }

  async register(cb: (em: EventManager) => void) {
    await configureEventHandler(this._container, cb);
  }
}
