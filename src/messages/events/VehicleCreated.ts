import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";

export interface VehicleCreatedProperties {
    model: string;
    licensePlate: string;
    userId: string;
}

@DecoratedEvent({
    name: 'VEHICLE_CREATED',
    namespace: 'mecano',
    version: 1,
})
export class VehicleCreated implements DomainEvent {
    id = v4();
    props: VehicleCreatedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: VehicleCreatedProperties) {
        this.props = props;
    }
}