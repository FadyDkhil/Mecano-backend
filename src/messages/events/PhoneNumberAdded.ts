import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface PhoneNumberAddedProperties {
    phone : string,
}

@DecoratedEvent({
    name: 'PHONE_NUMBER_ADDED',
    namespace: 'mecano',
    version: 1,
})
export class PhoneNumberAdded implements DomainEvent {
    id = v4()
    props: PhoneNumberAddedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: PhoneNumberAddedProperties) {
        this.props = props;
    }
}
