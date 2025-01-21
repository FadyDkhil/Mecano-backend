import { Newable } from 'ts-essentials';
import { Command } from './Command';

export type CommandCtor<TCommand extends Command> = Newable<TCommand>;
