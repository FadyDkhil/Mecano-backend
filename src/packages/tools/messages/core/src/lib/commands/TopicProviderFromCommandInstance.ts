import { Command } from './Command';

export interface TopicProviderFromCommandInstance {
  getTopics<TCommand extends Command>(command: TCommand): string[];
}
