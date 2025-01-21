import {inject, injectable} from "inversify";
import {Usecase} from "ddd";
import {Identifiers} from "../../../Identifiers";
import {EventDispatcher} from "ddd";
import {UserIdentity} from "ddd";
import {UserRole} from "../../domain/types/UserRole";
import { RequestStatus } from "../../domain/types/RequestStatus";
import { UserErrors } from "../../domain/errors/UserErrors";
import { RequestingMechanicRepository } from "../../domain/repositories/RequestingMechanicRepository";
import { MechanicErrors } from "../../domain/errors/MechanicErrors";

export interface ChooseStatusInput {
    id: string;
    userId: string;
    status: RequestStatus
}

@injectable()
export class ChooseStatus implements Usecase<ChooseStatusInput, void> {
    constructor(
        @inject(Identifiers.requestingMechanicRepository)
        private readonly requestingMechanicRepository: RequestingMechanicRepository,
        @inject(EventDispatcher)
        private readonly eventDispatcher: EventDispatcher
    ) {}

    async execute(request?: ChooseStatusInput): Promise<void> {
        const { id, status } = request;
        
        let requesting = await this.requestingMechanicRepository.getById(id)
        if (!requesting) {
            throw new MechanicErrors.RequestNotFound()
        }
        
        if(status == RequestStatus.ACCEPTED)
        {
            requesting.chooseStatus(RequestStatus.ACCEPTED)
        }
        if(status == RequestStatus.REJECTED)
        {
            requesting.chooseStatus(RequestStatus.REJECTED)
            requesting.delete()
        }

        await this.requestingMechanicRepository.save(requesting);
        await this.eventDispatcher.dispatch(requesting);
    }

    async canExecute(identity: UserIdentity, request?: ChooseStatusInput): Promise<boolean> {
       return  identity.id === request.userId || identity.role >= UserRole.MECHANIC;
    }
}