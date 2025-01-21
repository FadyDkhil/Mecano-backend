import { EventHandlerCtor } from './EventHandlerCtor';
import { Event } from '../Event';
import { EventCtor } from '../EventCtor';
import { EventHandlerRegistrationOptions } from './EventHandlerRegistrationOptions';

export interface EventHandlerRegistration<TEvent extends Event> {
  event: EventCtor<TEvent>;
  handler: EventHandlerCtor<TEvent>;
  options?: EventHandlerRegistrationOptions;
}
