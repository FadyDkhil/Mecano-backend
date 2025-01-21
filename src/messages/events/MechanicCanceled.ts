import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import { RequestStatus } from "../../core/write/domain/types/RequestStatus";

export interface MechanicCanceledProperties {
    id: string;
    status: RequestStatus;
}

@DecoratedEvent({
    name: "MECHANIC_CANCELED",
    namespace: "mecano",
    version: 1,
})
export class MechanicCanceled implements DomainEvent {
    id = v4();
    props: MechanicCanceledProperties;
    timestamp? = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: MechanicCanceledProperties) {
        this.props = props;
    }
}
