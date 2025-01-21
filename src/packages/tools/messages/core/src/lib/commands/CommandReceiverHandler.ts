import { AsyncOrSync } from 'ts-essentials';
import { Command } from './Command';
import { CommandReceiveContext } from './CommandReceiveContext';

export interface CommandReceiverHandler {
  identifier: string;
  handle: (event: Command, ctx: CommandReceiveContext) => AsyncOrSync<void>;
}
