import {inject, injectable} from "inversify";
import {Identifiers} from "../../Identifiers";
import {Query} from "ddd";
import { MechanicRequestsReadModel } from "../models/MechanicRequestsReadModel";
import { MechanicRequestsReadModelRepository } from "../repositories/MechanicRequestsReadModelRepository";


@injectable()
export class GetMechanicRequests
implements Query<string, MechanicRequestsReadModel[]>
{
    constructor(
        @inject(Identifiers.mechanicRequestsReadModelRepository)
        private readonly mechanicRequestsReadModelRepository: MechanicRequestsReadModelRepository
    ) {}

    async execute(): Promise<MechanicRequestsReadModel[]> {
        return await this.mechanicRequestsReadModelRepository.getAll();
    }

}
