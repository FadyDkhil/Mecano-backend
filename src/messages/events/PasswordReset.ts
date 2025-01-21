import {v4} from "uuid";
import {DecoratedEvent} from "messages-core";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";


export interface PasswordResetProperties {
    password: string;
}

@DecoratedEvent({
    name: 'PASSWORD_RESET',
    namespace: 'mecano',
    version: 1,
})
export class PasswordReset implements DomainEvent {
    id = v4()
    props: PasswordResetProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: PasswordResetProperties) {
        this.props = props;
    }
}
