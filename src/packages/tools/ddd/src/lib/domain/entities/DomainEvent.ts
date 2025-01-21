import { DomainEventMetadata } from '../types/DomainEventMetadata';
import { Event } from 'messages-core';

export interface DomainEvent<TProps = any> extends Event<TProps> {
  metadata?: DomainEventMetadata;
}
