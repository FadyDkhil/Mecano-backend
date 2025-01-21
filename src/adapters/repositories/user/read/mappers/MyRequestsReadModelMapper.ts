import { Mapper } from "ddd";
import { MyRequestsReadModel } from "../../../../../core/read/models/MyRequestsReadModel";

export class MyRequestsReadModelMapper implements Mapper<any, MyRequestsReadModel> {
    toDomain(domainModel: any): MyRequestsReadModel {
        return {
            id: domainModel.id,
            userId: domainModel.userId,
            mechanicId: domainModel.mechanicId,
            location: domainModel.location,
            reason: domainModel.reason,
            profile: {
                firstName: domainModel.profile?.firstName,
                lastName: domainModel.profile?.lastName,
                birthDate: domainModel.profile?.birthDate,
                gender: domainModel.profile?.gender,
                profilePicture: domainModel.profile?.profilePicture,
                createdAt: domainModel.profile?.createdAt,
                updatedAt: domainModel.profile?.updatedAt,
            },
            vehicle: {
                id: domainModel.vehicle?.id,
                model: domainModel.vehicle?.model,
                licensePlate: domainModel.vehicle?.licensePlate,
            }
        };
    }
}
