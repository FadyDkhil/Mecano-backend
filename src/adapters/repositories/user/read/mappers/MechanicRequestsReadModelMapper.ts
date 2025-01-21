import { Mapper } from "ddd";
import { MechanicRequestsReadModel } from "../../../../../core/read/models/MechanicRequestsReadModel";

export class MechanicRequestsReadModelMapper
    implements Mapper<any, MechanicRequestsReadModel>
{
    toDomain(domainModel: any): MechanicRequestsReadModel {
        const result: Partial<MechanicRequestsReadModel> = {
            id: domainModel.id,
            userId: domainModel.userId, 
            cv: domainModel.cv, 
            status: domainModel.status,
            profile: {
                firstName: domainModel.profile?.firstName,
                lastName: domainModel.profile?.lastName,
                birthDate: domainModel.profile?.birthDate,
                gender: domainModel.profile?.gender,
                profilePicture: domainModel.profile?.profilePicture,
                createdAt: domainModel.profile?.createdAt,
                updatedAt: domainModel.profile?.updatedAt,
            },
        };

        return result as MechanicRequestsReadModel;
    }
}
