import {inject, injectable} from "inversify";
import {Usecase} from "ddd";
import {Identifiers} from "../../../Identifiers";
import {EventDispatcher} from "ddd";
import { RequestingMechanic } from "../../domain/aggregates/RequestingMechanic";
import { RequestingMechanicRepository } from "../../domain/repositories/RequestingMechanicRepository";


export interface CreateRequestInput {
    userId: string;
    mechanicId: string;
    location?: string;
    reason?: string;
}

@injectable()
export class CreateRequest implements Usecase<CreateRequestInput, RequestingMechanic> {
    constructor(
        @inject(Identifiers.requestingMechanicRepository)
        private readonly requestingMechanicRepository: RequestingMechanicRepository,
        @inject(EventDispatcher)
        private readonly eventDispatcher: EventDispatcher
    ) {}

    async execute(request: CreateRequestInput): Promise<RequestingMechanic> {
        const { userId, mechanicId, location, reason } = request;
        const requesting = RequestingMechanic.create({
            userId,
            mechanicId,
            location,
            reason
        });
        await this.requestingMechanicRepository.save(requesting);
        //await this.eventDispatcher.dispatch(requesting);
        return requesting;
    }
}