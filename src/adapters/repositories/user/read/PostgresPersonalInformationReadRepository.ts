import {EntityManager} from "typeorm";
import {PersonalInformationReadModelRepository} from "../../../../core/read/repositories/PersonalInformationReadModelRepository";
import {PersonalInformationReadModelMapper} from "./mappers/PersonalInformationReadModelMapper";
import {PersonalInformationReadModel} from "../../../../core/read/models/PersonalInformationReadModel";
import { Buffer } from "buffer";

export class PostgresPersonalInformationReadRepository
    implements PersonalInformationReadModelRepository
{
    private personalInformationReadModelMapper: PersonalInformationReadModelMapper;

    constructor(private readonly entityManager: EntityManager) {
        this.personalInformationReadModelMapper =
            new PersonalInformationReadModelMapper();
    }

   

    async getById(id: string): Promise<PersonalInformationReadModel | null> {
        const userInformationArray = await this.entityManager.query(
            `SELECT
                u.id,
                u.email,
                u.phone,
                u."signInAt",
                u.status,
                u."recoveryCode",
                u."createdAt" AS user_created_at,
                u."updatedAt" AS user_updated_at,
                jsonb_build_object(
                    'firstName', p."firstName",
                    'lastName', p."lastName",
                    'birthDate', p."birthDate",
                    'gender', p."gender",
                    'cv', p."cv",
                    'profilePicture', p."profilePicture",
                    'createdAt', p."createdAt",
                    'updatedAt', p."updatedAt"
                ) AS profile
            FROM
                users u
                LEFT JOIN profiles p ON u.id = p.id
            WHERE
                u.id = $1
            GROUP BY
                u.id,
                p."firstName",
                p."lastName",
                p."birthDate",
                p."gender",
                p."cv",
                p."profilePicture",
                p."createdAt",
                p."updatedAt"`,
            [Buffer.from(id.replace(/-/g, ""), "hex")] // ✅ Convert UUID string to Buffer
        );
    
        if (userInformationArray.length === 0) {
            return null;
        }
    
        return this.personalInformationReadModelMapper.toDomain(userInformationArray[0]);
    }
    
    
}
