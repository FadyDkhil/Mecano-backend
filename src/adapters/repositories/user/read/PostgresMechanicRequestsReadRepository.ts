import {EntityManager} from "typeorm";
import {MechanicRequestsReadModelRepository} from "../../../../core/read/repositories/MechanicRequestsReadModelRepository";
import {MechanicRequestsReadModelMapper} from "./mappers/MechanicRequestsReadModelMapper";
import {MechanicRequestsReadModel} from "../../../../core/read/models/MechanicRequestsReadModel";

export class PostgresMechanicRequestsReadRepository
    implements MechanicRequestsReadModelRepository
{
    private mechanicRequestsReadModelMapper: MechanicRequestsReadModelMapper;

    constructor(private readonly entityManager: EntityManager) {
        this.mechanicRequestsReadModelMapper =
            new MechanicRequestsReadModelMapper();
    }

    async getAll(): Promise<MechanicRequestsReadModel[] | null> {
        const mechanicRequestsArray = await this.entityManager.query(
            `SELECT
                m.id,
                m."userId",
                m.cv,
                m.status,
                jsonb_build_object(
                    'firstName', p."firstName",
                    'lastName', p."lastName",
                    'birthDate', p."birthDate",
                    'gender', p."gender",
                    'profilePicture', p."profilePicture",
                    'createdAt', p."createdAt",
                    'updatedAt', p."updatedAt"
                ) AS profile
            FROM
                mechanics m
                LEFT JOIN profiles p ON m."userId"::uuid = p.id  -- Cast m."userId" to uuid
                ORDER BY
                m."createdAt" DESC;`

        );
        
        

        if (mechanicRequestsArray.length === 0) {
            return null;
        }
    
        const mechanicRequests = mechanicRequestsArray.map((mechanicRequest) =>
            this.mechanicRequestsReadModelMapper.toDomain(mechanicRequest)
        );
    
        return mechanicRequests;
    }
}
