import { Event } from './Event';
import { EventHandler } from './handlers/EventHandler';

export interface EventReceiverHandler<TEvent extends Event> extends EventHandler<TEvent> {
  identifier: string;
}
