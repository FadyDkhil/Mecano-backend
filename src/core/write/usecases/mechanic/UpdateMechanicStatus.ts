import {inject, injectable} from "inversify";
import {Usecase} from "ddd";
import {Identifiers} from "../../../Identifiers";
import {EventDispatcher} from "ddd";
import {UserIdentity} from "ddd";
import {UserRole} from "../../domain/types/UserRole";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { RequestStatus } from "../../domain/types/RequestStatus";
import { UserErrors } from "../../domain/errors/UserErrors";

export interface UpdateMechanicStatusInput {
    userId: string;
    status: RequestStatus
}

@injectable()
export class UpdateMechanicStatus implements Usecase<UpdateMechanicStatusInput, void> {
    constructor(
        @inject(Identifiers.userRepository)
        private readonly userRepository: UserRepository,
        @inject(EventDispatcher)
        private readonly eventDispatcher: EventDispatcher
    ) {}

    async execute(request?: UpdateMechanicStatusInput): Promise<void> {
        const { userId, status } = request;
        
        let user = await this.userRepository.getById(userId)
        if (!user) {
            throw new UserErrors.UserNotFound()
        }
        
        if(status == RequestStatus.ACCEPTED)
        {
            user.update({
                role: UserRole.MECHANIC,
            })
        }

        await this.userRepository.save(user);
        //await this.eventDispatcher.dispatch(user);
    }

    async canExecute(identity: UserIdentity, request?: UpdateMechanicStatusInput): Promise<boolean> {
       return  identity.id === request.userId || identity.role >= UserRole.ADMIN;
    }
}