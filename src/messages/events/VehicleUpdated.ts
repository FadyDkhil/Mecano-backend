import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";

export interface VehicleUpdatedProperties {
    model: string;
    licensePlate: string;
}

@DecoratedEvent({
    name: 'VEHICLE_UPDATED',
    namespace: 'mecano',
    version: 1,
})
export class VehicleUpdated implements DomainEvent {
    id = v4();
    props: VehicleUpdatedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: VehicleUpdatedProperties) {
        this.props = props;
    }
}