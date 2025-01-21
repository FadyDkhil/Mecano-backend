import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import { RequestStatus } from "../../core/write/domain/types/RequestStatus";

export interface MechanicPendingProperties {
    id: string;
    status: RequestStatus;
}

@DecoratedEvent({
    name: "MECHANIC_PENDING",
    namespace: "mecano",
    version: 1,
})
export class MechanicPending implements DomainEvent {
    id = v4();
    props: MechanicPendingProperties;
    timestamp? = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: MechanicPendingProperties) {
        this.props = props;
    }
}
