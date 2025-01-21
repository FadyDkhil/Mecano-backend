import {RateEntity} from "../entities/RateEntity";
import {Rate} from "../../../../../core/write/domain/aggregates/Rate";
import {Mapper} from "ddd";
import {EntityManager} from "typeorm";

export class RateEntityMapper implements Mapper<RateEntity, Rate> {
    constructor(
        private readonly entityManager: EntityManager
    ) {
    }

fromDomain(param: Rate): RateEntity {
        return this.entityManager.create(RateEntity, {
            id: param.id,
            userId: param.props.userId,
            mechanicId: param.props.mechanicId,
            rateNumber: param.props.rateNumber,
        })
    }

    toDomain(raw: RateEntity): Rate {
        const rate = Rate.restore({
            id: raw.id,
            userId: raw.userId,
            mechanicId: raw.mechanicId,
            rateNumber: raw.rateNumber,
        })
        rate.createdAt = raw.createdAt;
        rate.updatedAt = raw.updatedAt;
        return rate;
    }
}