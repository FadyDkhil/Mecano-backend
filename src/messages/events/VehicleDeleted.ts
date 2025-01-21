import { v4 } from "uuid";
import { DecoratedEvent } from "messages-core";
import { DomainEvent } from "ddd";
import { DomainEventMetadata } from "ddd";

export interface VehicleDeletedProperties {
    id: string;
    licensePlate: string;
}

@DecoratedEvent({
    name: "VEHICLE_DELETED",
    namespace: "mecano",
    version: 1,
})
export class VehicleDeleted implements DomainEvent {
    id = v4();
    props: VehicleDeletedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: VehicleDeletedProperties) {
        this.props = props;
    }
}
