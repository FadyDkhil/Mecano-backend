import {inject, injectable} from "inversify";
import {RecoveryCodeGenerated} from "../../../messages/events/RecoveryCodeGenerated";
import {SendEmail} from "../../../core/write/usecases/notification/SendEmail";
import {DomainEventHandler} from "ddd";

@injectable()
export class HandleRecoveryCodeGeneratedEvent implements DomainEventHandler<RecoveryCodeGenerated> {
    constructor(
       @inject(SendEmail)
        private readonly _sendEmail: SendEmail,

    ) {

    }

    async handle(domainEvent: RecoveryCodeGenerated): Promise<void> {
        await this._sendEmail.execute({
            templateId: "d-f8bf8adcc60e4a20a9882dca1b6c42c2",
            data: {
                data: domainEvent.props.recoveryCode
            },
            userId: domainEvent.props.id
        })
    }
}

