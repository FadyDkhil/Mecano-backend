import { DomainEvent } from '../entities/DomainEvent';
import { Newable } from 'ts-essentials';

export type EventCtor<TEvent extends DomainEvent> = Newable<TEvent>;
