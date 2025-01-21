import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface RecoveryCodeGeneratedProperties {
  id: string;
  email: string;
  recoveryCode: string;
}

@DecoratedEvent({
  name: 'RECOVERY_CODE_GENERATED',
  namespace: 'mecano',
  version: 1,
})
export class RecoveryCodeGenerated implements DomainEvent {
  id = v4()
  props: RecoveryCodeGeneratedProperties;
  timestamp = +new Date();
  metadata: DomainEventMetadata;

  constructor(props: RecoveryCodeGeneratedProperties) {
    this.props = props;
  }
}
