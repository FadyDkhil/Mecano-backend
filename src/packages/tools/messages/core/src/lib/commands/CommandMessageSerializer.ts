import { Command } from './Command';

export abstract class CommandMessageSerializer {
  abstract serialize(event: Command): string;
  abstract deserialize(event: string): Command;
}
