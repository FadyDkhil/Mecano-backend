import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";

export interface RateCreatedProperties {
    id: string;
    userId: string;
    mechanicId: string;
    rateNumber: number;
}

@DecoratedEvent({
    name: 'RATE_CREATED',
    namespace: 'mecano',
    version: 1,
})
export class RateCreated implements DomainEvent {
    id = v4()
    props: RateCreatedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: RateCreatedProperties) {
        this.props = props;
    }
}
