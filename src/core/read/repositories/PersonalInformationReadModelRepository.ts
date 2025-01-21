import {PersonalInformationReadModel} from "../models/PersonalInformationReadModel";

export interface PersonalInformationReadModelRepository {
    getById(id: string): Promise<PersonalInformationReadModel>;
}
