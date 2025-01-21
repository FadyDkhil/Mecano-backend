import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface IdentityCheckedProperties {
    id: string;
    workflowId: string;
    applicantId: string;
    result: string;
    startedAt?: Date;
    endedAt?: Date;
}

@DecoratedEvent({
    name: 'IDENTITY_CHECKED',
    namespace: 'mecano',
    version: 1,
})
export class IdentityChecked implements DomainEvent {
    id = v4()
    props: IdentityCheckedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: IdentityCheckedProperties) {
        this.props = props;
    }
}