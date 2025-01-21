import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface RecipientCreatedProperties {
  email: string;
  phone: string;
}

@DecoratedEvent({
  name: 'RECIPIENT_CREATED',
  namespace: 'mecano',
  version: 1,
})
export class RecipientCreated implements DomainEvent {
  id = v4()
  props: RecipientCreatedProperties;
  timestamp = +new Date();
  metadata: DomainEventMetadata;

  constructor(props: RecipientCreatedProperties) {
    this.props = props;
  }
}
