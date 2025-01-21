import { IdentityCheck } from "../../../../core/write/domain/aggregates/IdentityCheck";
import {IdentityCheckRepository} from "../../../../core/write/domain/repositories/IdentityCheckRepository";
import { IdentityCheckEntity } from "./entities/IdentityCheckEntity";
import { IdentityCheckEntityMapper } from "./mappers/IdentityCheckEntityMapper";

export class PostgresIdentityCheckRepository
    implements IdentityCheckRepository
{
    private _identityCheckEntityMapper: IdentityCheckEntityMapper;

    constructor(private readonly entityManager: any) {
        this._identityCheckEntityMapper = new IdentityCheckEntityMapper(this.entityManager);
    }

    async save(identityCheck: IdentityCheck): Promise<void> {
        const identityCheckRepo = this.entityManager.getRepository(IdentityCheckEntity)
        const identityCheckEntity = this._identityCheckEntityMapper.fromDomain(identityCheck);
        await identityCheckRepo.save(identityCheckEntity)
    }

    async getById(id:string): Promise<IdentityCheck> {
        const identityCheckRepo = this.entityManager.getRepository(IdentityCheckEntity)
        const identityCheckEntity = await identityCheckRepo.findOne({
            where : {
                id
            }
        })
        if (!identityCheckEntity) return null;
        return this._identityCheckEntityMapper.toDomain(identityCheckEntity)
    }

    async getByApplicantId(applicantId: string): Promise<IdentityCheck> {
        const identityCheckRepo = this.entityManager.getRepository(IdentityCheckEntity)
        const identityCheckEntity = await identityCheckRepo.findOne({
            where : {
                applicantId
            }
        })
        if (!identityCheckEntity) return null;
        return this._identityCheckEntityMapper.toDomain(identityCheckEntity)
    }

}
