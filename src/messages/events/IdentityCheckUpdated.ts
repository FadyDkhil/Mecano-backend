import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface IdentityCheckUpdatedProperties {
    workflowId: string;
}

@DecoratedEvent({
    name: 'IDENTITY_CHECKED_INITIATED',
    namespace: 'mecano',
    version: 1,
})
export class IdentityCheckUpdated implements DomainEvent {
    id = v4()
    props: IdentityCheckUpdatedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: IdentityCheckUpdatedProperties) {
        this.props = props;
    }
}