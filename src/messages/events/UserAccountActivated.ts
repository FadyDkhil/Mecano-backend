import {v4} from "uuid";
import {DomainEvent} from "ddd";
import {DomainEventMetadata} from "ddd";
import {DecoratedEvent} from "messages-core";
import {AccountStatus} from "../../core/write/domain/types/AccountStatus";


export interface UserAccountActivatedProperties {
    accountStatus: AccountStatus;
}

@DecoratedEvent({
    name: 'USER_ACCOUNT_ACTIVATED',
    namespace: 'mecano',
    version: 1,
})
export class UserAccountActivated implements DomainEvent {
    id = v4()
    props: UserAccountActivatedProperties;
    timestamp = +new Date();
    metadata: DomainEventMetadata;

    constructor(props: UserAccountActivatedProperties) {
        this.props = props;
    }
}
