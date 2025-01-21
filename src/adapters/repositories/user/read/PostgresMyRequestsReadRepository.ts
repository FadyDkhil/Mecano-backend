import { MyRequestsReadModelRepository } from "../../../../core/read/repositories/MyRequestsReadModelRepository";
import { MyRequestsReadModel } from "../../../../core/read/models/MyRequestsReadModel";
import { EntityManager } from "typeorm";

export class PostgresMyRequestsReadRepository implements MyRequestsReadModelRepository {
    constructor(private readonly manager: EntityManager) {}

    async getAll(mechanicId: string): Promise<MyRequestsReadModel[]> {
        const result = await this.manager.query(
            `SELECT 
                rm.id, 
                rm."userId", 
                rm."mechanicId", 
                rm.location, 
                rm.reason,
                jsonb_build_object(
                    'firstName', p."firstName",
                    'lastName', p."lastName",
                    'birthDate', p."birthDate",
                    'gender', p."gender",
                    'profilePicture', p."profilePicture",
                    'createdAt', p."createdAt",
                    'updatedAt', p."updatedAt"
                ) AS profile,
                jsonb_build_object(
                    'id', v.id,
                    'model', v.model,
                    'licensePlate', v."licensePlate"
                ) AS vehicle
            FROM requested_mechanics rm
            LEFT JOIN profiles p ON rm."userId" = p.id
            LEFT JOIN vehicles v ON rm."userId" = v."userId"
            WHERE rm."mechanicId" = $1;`,
            [mechanicId]
        );

        return result;
    }
}
