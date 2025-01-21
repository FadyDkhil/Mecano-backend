import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface UserSignInProperties {
  signInAt: Date
}

@DecoratedEvent({
  name: 'USER_SIGN_IN',
  namespace: 'mecano',
  version: 1,
})
export class UserSignIn implements DomainEvent {
  id = v4()
  props: UserSignInProperties;
  timestamp = +new Date();
  metadata: DomainEventMetadata;

  constructor(props: UserSignInProperties) {
    this.props = props;
  }
}
