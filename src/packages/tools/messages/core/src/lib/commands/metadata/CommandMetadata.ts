import 'reflect-metadata';
import { Command } from '../Command';
import { CommandCtor } from '../CommandCtor';

const EVENT_METADATA_SYMBOL = Symbol('EVENT_METADATA_SYMBOL');

export class CommandMetadata<TCommand extends Command = Command> {
  public static ensure<TCommand extends Command>(target: CommandCtor<TCommand>): CommandMetadata<TCommand> {
    if (!Reflect.hasOwnMetadata(EVENT_METADATA_SYMBOL, target)) {
      const schemaMetadata = new CommandMetadata(target);

      Reflect.defineMetadata(EVENT_METADATA_SYMBOL, schemaMetadata, target);
    }

    return Reflect.getOwnMetadata(EVENT_METADATA_SYMBOL, target);
  }

  public static getFromCtor<TCommand extends Command>(
    target: CommandCtor<TCommand>,
  ): CommandMetadata<TCommand> {
    return Reflect.getOwnMetadata(EVENT_METADATA_SYMBOL, target);
  }

  public static getFromInstance<TCommand extends Command>(target: TCommand): CommandMetadata<TCommand> {
    return Reflect.getOwnMetadata(EVENT_METADATA_SYMBOL, target.constructor);
  }

  constructor(target: CommandCtor<TCommand>) {
    this.target = target;
  }

  public target: CommandCtor<TCommand>;
  public name: string;
  public namespace: string;
  public version: number;
}
