import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface IdentityVerifiedProperties {
    result: string;
}

@DecoratedEvent({
    name: 'IDENTITY_VERIFIED',
    namespace: 'mecano',
    version: 1,
})
export class IdentityVerified implements DomainEvent {
    id = v4()
    props: IdentityVerifiedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: IdentityVerifiedProperties) {
        this.props = props;
    }
}