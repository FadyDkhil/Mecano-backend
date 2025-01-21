import { Rate } from "../../../../core/write/domain/aggregates/Rate";
import {RateRepository} from "../../../../core/write/domain/repositories/RateRepository";
import {RateEntityMapper} from "./mappers/RateEntityMapper";
import {RateEntity} from "./entities/RateEntity";
import {injectable} from "inversify";

@injectable()
export class PostgresRateRepository implements RateRepository {
    private _rateEntityMapper: RateEntityMapper
    
    constructor(
        private readonly entityManager: any
    ) {
        this._rateEntityMapper = new RateEntityMapper(this.entityManager)
    }
    async save(rate: Rate): Promise<void> {
        const rateRepo = this.entityManager.getRepository(RateEntity)
        const rateEntity = this._rateEntityMapper.fromDomain(rate)
        await rateRepo.save(rateEntity)
    }

}