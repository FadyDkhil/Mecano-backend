import { inject, injectable } from "inversify";
import { Identifiers } from "../../Identifiers";
import { Query } from "ddd";
import { UserReadModel } from "../models/UserReadModel"; // Adjust the import if necessary
import { UserReadRepository } from "../repositories/UserReadRepository"; // Adjust the import if necessary

@injectable()
export class GetUsers implements Query<string, UserReadModel[]> {
    constructor(
        @inject(Identifiers.userReadModelRepository)
        private readonly userReadModelRepository: UserReadRepository
    ) {}

    async execute(): Promise<UserReadModel[]> {
        return await this.userReadModelRepository.getAll();
    }
}
