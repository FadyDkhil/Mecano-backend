import {inject, injectable} from "inversify";
import {DomainEventHandler} from "ddd";
import {UserSignedUp} from "../../../messages/events/UserSignedUp";
import {SaveRecipient} from "../../../core/write/usecases/notification/SaveRecipient";
import {ActivateUser} from "../../../core/write/usecases/user/ActivateUser";

@injectable()
export class HandleUserSignedUp implements DomainEventHandler<UserSignedUp> {
    constructor(
        @inject(SaveRecipient)
        private readonly _saveRecipient : SaveRecipient,
        @inject(ActivateUser)
        private readonly _activateUser: ActivateUser

    ) {
    }

    async handle(domainEvent: UserSignedUp): Promise<void> {
        const recipient = await this._saveRecipient.execute({
            id : domainEvent.metadata.aggregateId,
            email : domainEvent.props.email,
            phone : null
        })
        await this._activateUser.execute({userId: domainEvent.metadata.aggregateId})
        //TODO: Implement the logic to send account activation email
        /*if(domainEvent.props.authMode === AuthMode.EMAIL) {
            const encryptedId = sign({
                id: domainEvent.metadata.aggregateId
            }, process.env.JWT_SECRET, {expiresIn: '30min'})
            const url = `${process.env.BACKEND_URL}/api/common/${encryptedId}`
            await this._eventDispatcher.dispatchEvent(new SendAccountActivationEmailEvent({
                email: recipient.props.email,
                url
            }))
        }else if (domainEvent.props.authMode === AuthMode.APPLE || domainEvent.props.authMode === AuthMode.GOOGLE) {
            await this._activateUser.execute({userId: domainEvent.metadata.aggregateId})
        }*/
    }
}
