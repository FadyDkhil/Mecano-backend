import { injectable } from 'inversify';
import { Command } from './Command';

@injectable()
export abstract class CommandDispatcher {
  abstract dispatch(event: Command): Promise<void>;
}
