import {injectable} from "inversify";
import { MechanicRequest } from "../../../../core/write/domain/aggregates/MechanicRequest";
import { MechanicRequestEntityMapper } from "./mappers/MechanicRequestEntityMapper";
import { MechanicRequestEntity } from "./entities/MechanicRequestEntity";
import { MechanicRequestRepository } from "../../../../core/write/domain/repositories/MechanicRequestRepository";
import { MechanicReuqestErrors } from "../../../../core/write/domain/errors/MechanicRequestErrors";

@injectable()
export class PostgresMechanicRequestRepository implements MechanicRequestRepository {
    private _mechanicRequestEntityMapper: MechanicRequestEntityMapper
    
    constructor(
        private readonly entityManager: any
    ) {
        this._mechanicRequestEntityMapper = new MechanicRequestEntityMapper(this.entityManager)
    }
    async save(mechanicRequest: MechanicRequest): Promise<void> {
        const mechanicRequestRepo = this.entityManager.getRepository(MechanicRequestEntity)
        const mechanicRequestEntity = this._mechanicRequestEntityMapper.fromDomain(mechanicRequest)
        await mechanicRequestRepo.save(mechanicRequestEntity)
    }
    async getById(id: string): Promise<MechanicRequest> {
        const mechanicRequestRepo = this.entityManager.getRepository(MechanicRequestEntity)
        const mechanicRequestEntity = await mechanicRequestRepo.findOne({
            where: {
                id
            }
        })
        if (!mechanicRequestEntity)
        {
            throw new MechanicReuqestErrors.MechanicReuqestNotFound()
        }
        return this._mechanicRequestEntityMapper.toDomain(mechanicRequestEntity)
    }

}