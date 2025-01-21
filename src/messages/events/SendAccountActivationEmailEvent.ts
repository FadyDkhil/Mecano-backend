import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface SendAccountActivationEmailEventProperties {
  email: string,
  url : string
}

@DecoratedEvent({
  name: 'SEND_ACCOUNT_ACTIVATION_EMAIL',
  namespace: 'mecano',
  version: 1,
})
export class SendAccountActivationEmailEvent implements DomainEvent {
  id = v4()
  props: SendAccountActivationEmailEventProperties;
  timestamp = +new Date();
  metadata: DomainEventMetadata;

  constructor(props: SendAccountActivationEmailEventProperties) {
    this.props = props;
  }
}
