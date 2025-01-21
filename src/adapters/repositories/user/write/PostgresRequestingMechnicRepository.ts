import { RequestingMechanic } from "../../../../core/write/domain/aggregates/RequestingMechanic";
import {RequestingMechanicRepository} from "../../../../core/write/domain/repositories/RequestingMechanicRepository";
import {injectable} from "inversify";
import { RequestingMechanicEntityMapper } from "./mappers/RequestingMechanicEntityMapper";
import { RequestingMechanicEntity } from "./entities/RequestingMechanicEntity";

@injectable()
export class PostgresRequestingMechanicRepository implements RequestingMechanicRepository {
    private _requestingMechanicEntityMapper: RequestingMechanicEntityMapper
    
    constructor(
        private readonly entityManager: any
    ) {
        this._requestingMechanicEntityMapper = new RequestingMechanicEntityMapper(this.entityManager)
    }
    async save(requesting: RequestingMechanic): Promise<void> {
        const requestingRepo = this.entityManager.getRepository(RequestingMechanicEntity)
        const requestingMechanicEntity = this._requestingMechanicEntityMapper.fromDomain(requesting)
        await requestingRepo.save(requestingMechanicEntity)
    }
    async getById(id: string): Promise<RequestingMechanic> {
        const requestingRepo = this.entityManager.getRepository(RequestingMechanicEntity)
        const requestingMechanicEntity = await requestingRepo.findOne({
            where: {
                id
            }
        })
        if (!requestingMechanicEntity)
        {
           // throw new RequestingMechanicErrors.RequestingMechanicNotFound()
        }
        return this._requestingMechanicEntityMapper.toDomain(requestingMechanicEntity)
    }

}