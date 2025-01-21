import { injectable } from 'inversify';
import { DomainEvent } from '../entities/DomainEvent';
import { DomainEventProducer } from '../entities/DomainEventProducer';

@injectable()
export abstract class EventDispatcher {
  abstract dispatch(entity: DomainEventProducer<any>, partitionKey?: string): Promise<void>;
  abstract dispatchEvent(event: DomainEvent<any>, partitionKey?: string): Promise<void>;
}
