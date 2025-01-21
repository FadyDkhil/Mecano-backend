import { Mapper } from "ddd";
import { UserReadModel } from "../../../../../core/read/models/UserReadModel"; // Adjust the import path if necessary

export class UserReadModelMapper implements Mapper<any, UserReadModel> {
    toDomain(domainModel: any): UserReadModel {
        const result: Partial<UserReadModel> = {
            id: domainModel.id,
            email: domainModel.email,
            phone: domainModel.phone,
            averageRate: domainModel.averageRate,
            profile: {
                firstName: domainModel.profile?.firstName,
                lastName: domainModel.profile?.lastName,
                gender: domainModel.profile?.gender,
                birthDate: domainModel.profile?.birthDate,
                profilePicture: domainModel.profile?.profilePicture,
                cv: domainModel.profile?.cv,
                createdAt: domainModel.profile?.createdAt,
                updatedAt: domainModel.profile?.updatedAt,
            },
        };

        return result as UserReadModel;
    }
}
