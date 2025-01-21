import {
  EventCtor,
  TopicProviderFromEventCtor,
  TopicProviderFromEventInstance,
  Event,
  EventMetadata,
} from 'messages-core';
import { injectable } from 'inversify';
import { assert } from 'ts-essentials';

@injectable()
export class DefaultTopicProviderFromEvent
  implements TopicProviderFromEventInstance, TopicProviderFromEventCtor
{
  getTopics<TEvent extends Event>(event: TEvent): string[];
  getTopics<TEvent extends Event>(event: EventCtor<TEvent>): string[];
  getTopics<TEvent extends Event>(event: TEvent | EventCtor<TEvent>): string[] {
    let metadata: EventMetadata<TEvent>;
    if (event instanceof Function) {
      metadata = EventMetadata.getFromCtor(event);
    } else {
      metadata = EventMetadata.getFromInstance(event);
    }

    assert(metadata.namespace);

    return [metadata.namespace];
  }
}
