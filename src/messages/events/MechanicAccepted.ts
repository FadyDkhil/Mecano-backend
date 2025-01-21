import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import { RequestStatus } from "../../core/write/domain/types/RequestStatus";

export interface MechanicAcceptedProperties {
    id: string;
    status: RequestStatus;
}

@DecoratedEvent({
    name: "MECHANIC_ACCEPTED",
    namespace: "mecano",
    version: 1,
})
export class MechanicAccepted implements DomainEvent {
    id = v4();
    props: MechanicAcceptedProperties;
    timestamp? = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: MechanicAcceptedProperties) {
        this.props = props;
    }
}
