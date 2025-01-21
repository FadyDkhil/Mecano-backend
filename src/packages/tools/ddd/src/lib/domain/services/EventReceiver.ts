import { injectable } from 'inversify';
import { DomainEvent } from '../entities/DomainEvent';
import { EventHandler } from 'messages-core';

export interface SubscriptionInfo {
  channel: string;
  eventName: string;
  version: number;
}

@injectable()
export abstract class EventReceiver {
  abstract subscribe<T extends DomainEvent>(
    info: SubscriptionInfo,
    eventDomainHandler: EventHandler<T>,
  ): Promise<void>;
  abstract start(): Promise<void>;
}
