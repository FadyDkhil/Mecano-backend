import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface ProfilePictureAddedProperties {
    profilePicture : string,
}

@DecoratedEvent({
    name: 'PROFILE_PICTURE_ADDED',
    namespace: 'mecano',
    version: 1,
})
export class ProfilePictureAdded implements DomainEvent {
    id = v4()
    props: ProfilePictureAddedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: ProfilePictureAddedProperties) {
        this.props = props;
    }
}
