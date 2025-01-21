import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import { RequestStatus } from "../../core/write/domain/types/RequestStatus";

export interface MechanicRejectedProperties {
    id: string;
    status: RequestStatus;
}

@DecoratedEvent({
    name: "MECHANIC_REJECTED",
    namespace: "mecano",
    version: 1,
})
export class MechanicRejected implements DomainEvent {
    id = v4();
    props: MechanicRejectedProperties;
    timestamp? = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: MechanicRejectedProperties) {
        this.props = props;
    }
}
