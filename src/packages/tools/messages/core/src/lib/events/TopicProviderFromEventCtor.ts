import { Event } from './Event';
import { EventCtor } from './EventCtor';
import { ExtendedSymbol } from '../types/ExtendedSymbol';

export const SymTopicProviderFromEventCtor = ExtendedSymbol('TopicProviderFromEventCtor');

export interface TopicProviderFromEventCtor {
  getTopics<TEvent extends Event>(event: EventCtor<TEvent>): string[];
}
