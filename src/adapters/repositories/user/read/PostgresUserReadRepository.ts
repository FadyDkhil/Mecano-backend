import { EntityManager } from "typeorm";
import { UserReadModel } from "../../../../core/read/models/UserReadModel";
import { UserReadRepository } from "../../../../core/read/repositories/UserReadRepository";

export class PostgresUserReadRepository implements UserReadRepository {
    constructor(private readonly entityManager: EntityManager) {}

    async getAll(): Promise<UserReadModel[] | null> {
        const usersArray = await this.entityManager.query(
            `SELECT
            u.id,
            u."email",
            u."phone",
            u."averageRate",
            jsonb_build_object(
                'firstName', p."firstName",
                'lastName', p."lastName",
                'birthDate', p."birthDate",
                'gender', p."gender",
                'profilePicture', p."profilePicture",
                'cv', p."cv",
                'createdAt', p."createdAt",
                'updatedAt', p."updatedAt"
            ) AS profile
        FROM
            users u
            LEFT JOIN profiles p ON u."id"::uuid = p.id  -- Cast u."userId" to uuid
            WHERE
            u.role = 1`
        );

        if (usersArray.length === 0) {
            return null;
        }

        return usersArray.map(user => ({
            ...user,
            profile: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                birthDate: user.birthDate,
                profilePicture: user.profilePicture,
                cv: user.cv,
                createdAt: user.profileCreatedAt,
                updatedAt: user.profileUpdatedAt,
            }
        }));
    }
}
