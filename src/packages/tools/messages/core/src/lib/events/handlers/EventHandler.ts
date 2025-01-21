import { AsyncOrSync } from 'ts-essentials';
import { EventReceiveContext } from '../EventReceiveContext';
import { Event } from '../Event';

export interface EventHandler<TEvent extends Event> {
  handle: (event: TEvent, ctx: EventReceiveContext) => AsyncOrSync<void>;
}
