import {Mapper} from "ddd";
import {EntityManager} from "typeorm";
import { RequestingMechanic } from "../../../../../core/write/domain/aggregates/RequestingMechanic";
import { RequestingMechanicEntity } from "../entities/RequestingMechanicEntity";

export class RequestingMechanicEntityMapper implements Mapper<RequestingMechanicEntity, RequestingMechanic> {
    constructor(
        private readonly entityManager: EntityManager
    ) {
    }

fromDomain(param: RequestingMechanic): RequestingMechanicEntity {
        return this.entityManager.create(RequestingMechanicEntity, {
            id: param.id,
            userId: param.props.userId,
            mechanicId: param.props.mechanicId,
            location: param.props.location,
            reason: param.props.reason,
            status: param.props.status,
            done: param.props.done,
        })
    }

    toDomain(raw: RequestingMechanicEntity): RequestingMechanic {
        const requesting = RequestingMechanic.restore({
            id: raw.id,
            userId: raw.userId,
            mechanicId: raw.mechanicId,
            location: raw.location,
            reason: raw.reason,
            status: raw.status,
            done: raw.done,
        })
        requesting.createdAt = raw.createdAt;
        requesting.updatedAt = raw.updatedAt;
        return requesting;
    }
}