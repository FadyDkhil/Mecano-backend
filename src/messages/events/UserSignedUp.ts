import {v4} from "uuid";

import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import {DecoratedEvent} from "messages-core";


export interface UserSignedUpProperties {
  email: string;
}

@DecoratedEvent({
  name: 'USER_SIGNED_UP',
  namespace: 'mecano',
  version: 1,
})
export class UserSignedUp implements DomainEvent {
  id = v4()
  props: UserSignedUpProperties;
  timestamp = +new Date();
  metadata: DomainEventMetadata;

  constructor(props: UserSignedUpProperties) {
    this.props = props;
  }
}
