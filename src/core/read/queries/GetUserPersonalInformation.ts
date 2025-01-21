import {PersonalInformationReadModel} from "../models/PersonalInformationReadModel";
import {inject, injectable} from "inversify";
import {Identifiers} from "../../Identifiers";
import {PersonalInformationReadModelRepository} from "../repositories/PersonalInformationReadModelRepository";
import {Query} from "ddd";

export interface GetPersonalInformationInput {
    id: string;
}

@injectable()
export class GetUserPersonalInformation
    implements Query<GetPersonalInformationInput, PersonalInformationReadModel>
{
    constructor(
        @inject(Identifiers.personalInformationReadModelRepository)
        private readonly personalInformationReadModelRepository: PersonalInformationReadModelRepository
    ) {}

    async execute(
        input: GetPersonalInformationInput
    ): Promise<PersonalInformationReadModel> {
        return await this.personalInformationReadModelRepository.getById(
            input.id
        );
    }

    
}
