import { inject, injectable } from "inversify";
import { Identifiers } from "../../Identifiers";
import { Query } from "ddd";
import { MyRequestsReadModel } from "../models/MyRequestsReadModel";
import { MyRequestsReadModelRepository } from "../repositories/MyRequestsReadModelRepository";

@injectable()
export class GetMyRequests implements Query<string, MyRequestsReadModel[]> {
    constructor(
        @inject(Identifiers.myRequestsReadModelRepository)
        private readonly myRequestsReadModelRepository: MyRequestsReadModelRepository
    ) {}

    async execute(mechanicId: string): Promise<MyRequestsReadModel[]> {
        return await this.myRequestsReadModelRepository.getAll(mechanicId);
    }
}
