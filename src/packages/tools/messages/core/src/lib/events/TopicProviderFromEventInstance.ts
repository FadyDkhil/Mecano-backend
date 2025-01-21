import { Event } from './Event';
import { ExtendedSymbol } from '../types/ExtendedSymbol';

export const SymTopicProviderFromEventInstance = ExtendedSymbol('TopicProviderFromEventInstance');

export interface TopicProviderFromEventInstance {
  getTopics<TEvent extends Event>(event: TEvent): string[];
}
