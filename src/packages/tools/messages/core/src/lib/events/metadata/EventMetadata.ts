import 'reflect-metadata';
import { EventCtor } from '../EventCtor';
import { Event } from '../Event';

const EVENT_METADATA_SYMBOL = Symbol('EVENT_METADATA_SYMBOL');

export class EventMetadata<TEvent extends Event = Event> {
  public static ensure<TEvent extends Event>(target: EventCtor<TEvent>): EventMetadata<TEvent> {
    if (!Reflect.hasOwnMetadata(EVENT_METADATA_SYMBOL, target)) {
      const schemaMetadata = new EventMetadata(target);

      Reflect.defineMetadata(EVENT_METADATA_SYMBOL, schemaMetadata, target);
    }

    return Reflect.getOwnMetadata(EVENT_METADATA_SYMBOL, target);
  }

  public static getFromCtor<TEvent extends Event>(target: EventCtor<TEvent>): EventMetadata<TEvent> {
    return Reflect.getOwnMetadata(EVENT_METADATA_SYMBOL, target);
  }

  public static getFromInstance<TEvent extends Event>(target: TEvent): EventMetadata<TEvent> {
    return Reflect.getOwnMetadata(EVENT_METADATA_SYMBOL, target.constructor);
  }

  constructor(target: EventCtor<TEvent>) {
    this.target = target;
  }

  public target: EventCtor<TEvent>;
  public name: string;
  public namespace: string;
  public version: number;
}
