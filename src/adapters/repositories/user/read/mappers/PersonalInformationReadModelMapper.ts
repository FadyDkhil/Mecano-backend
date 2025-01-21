import { Mapper } from "ddd";
import { PersonalInformationReadModel } from "../../../../../core/read/models/PersonalInformationReadModel";

export class PersonalInformationReadModelMapper
    implements Mapper<any, PersonalInformationReadModel>
{
    toDomain(domainModel: any): PersonalInformationReadModel {
        const result: Partial<PersonalInformationReadModel> = {
            id: domainModel.id,
            email: domainModel.email,
            phone: domainModel.phone,
            signInAt: domainModel.signInAt,
            status: domainModel.status,
            recoveryCode: domainModel.recoveryCode,
            createdAt: domainModel.user_created_at,
            updatedAt: domainModel.user_updated_at,
            profile: {
                firstName: domainModel.profile?.firstName,
                lastName: domainModel.profile?.lastName,
                birthDate: domainModel.profile?.birthDate,
                gender: domainModel.profile?.gender,
                cv: domainModel.profile?.cv,
                profilePicture: domainModel.profile?.profilePicture,
                createdAt: domainModel.profile?.createdAt,
                updatedAt: domainModel.profile?.updatedAt,
            },
        };

        return result as PersonalInformationReadModel;
    }
}
