import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import { Gender } from "../../core/write/domain/types/Gender";

export interface ProfileUpdatedProperties {
    firstname: string;
    lastname: string;
    birthDate: Date;
    gender: Gender;
}

@DecoratedEvent({
    name: "PROFILE_UPDATED",
    namespace: "mecano",
    version: 1,
})
export class ProfileUpdated implements DomainEvent {
    id = v4();
    props: ProfileUpdatedProperties;
    timestamp? = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: ProfileUpdatedProperties) {
        this.props = props;
    }
}
