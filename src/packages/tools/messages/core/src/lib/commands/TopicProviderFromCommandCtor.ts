import { Command } from './Command';
import { CommandCtor } from './CommandCtor';

export interface TopicProviderFromCommandCtor {
  getTopics<TCommand extends Command>(command: CommandCtor<TCommand>): string[];
}
