import { Command } from './Command';
import { CommandCtor } from './CommandCtor';
import { CommandReceiverHandler } from './CommandReceiverHandler';
import { Disposable } from '../types/Disposable';

export interface CommandReceiver {
  subscribe(event: CommandCtor<Command>, handler: CommandReceiverHandler): Disposable;
}
