import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import { Gender } from "../../core/write/domain/types/Gender";


export interface ProfileCreatedProperties {
    id: string;
    firstname: string;
    lastname: string;
    birthDate: Date;
    gender: Gender;
}

@DecoratedEvent({
    name: 'PROFILE_CREATED',
    namespace: 'mecano',
    version: 1,
})
export class ProfileCreated implements DomainEvent {
    id = v4()
    props: ProfileCreatedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: ProfileCreatedProperties) {
        this.props = props;
    }
}
