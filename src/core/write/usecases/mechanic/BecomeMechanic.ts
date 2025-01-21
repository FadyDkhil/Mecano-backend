import {inject, injectable} from "inversify";
import {Usecase} from "ddd";
import {Identifiers} from "../../../Identifiers";
import { MechanicRequest } from "../../domain/aggregates/MechanicRequest";
import { MechanicRequestRepository } from "../../domain/repositories/MechanicRequestRepository";


export interface BecomeMechanicInput {
    userId: string;
    cv: string;
}

@injectable()
export class BecomeMechanic implements Usecase<BecomeMechanicInput, MechanicRequest> {
    constructor(
        @inject(Identifiers.mechanicRequestRepository)
        private readonly mechanicRequestRepository: MechanicRequestRepository,
    ) {}

    async execute(request: BecomeMechanicInput): Promise<MechanicRequest> {
        const { userId, cv } = request;
        const mechanicRequest = MechanicRequest.create({
            userId,
            cv
        });
        await this.mechanicRequestRepository.save(mechanicRequest);
        return mechanicRequest;
    }
}