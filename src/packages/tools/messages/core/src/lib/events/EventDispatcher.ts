import { injectable } from 'inversify';
import { Event } from './Event';

@injectable()
export abstract class EventDispatcher {
  abstract dispatch(...event: Event[]): Promise<void>;
}
