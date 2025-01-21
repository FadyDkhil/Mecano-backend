import { Event } from './Event';
import { EventCtor } from './EventCtor';
import { EventReceiverHandler } from './EventReceiverHandler';
import { Disposable } from '../types/Disposable';

export abstract class EventReceiver {
  abstract subscribe(event: EventCtor<Event>, handler: EventReceiverHandler<Event>): Disposable;
}
