import {Mapper} from "ddd";
import {EntityManager} from "typeorm";
import { MechanicRequest } from "../../../../../core/write/domain/aggregates/MechanicRequest";
import { MechanicRequestEntity } from "../entities/MechanicRequestEntity";

export class MechanicRequestEntityMapper implements Mapper<MechanicRequestEntity, MechanicRequest> {
    constructor(
        private readonly entityManager: EntityManager
    ) {
    }

fromDomain(param: MechanicRequest): MechanicRequestEntity {
        return this.entityManager.create(MechanicRequestEntity, {
            id: param.id,
            userId: param.props.userId,
            cv: param.props.cv,
            status: param.props.status
        })
    }

    toDomain(raw: MechanicRequestEntity): MechanicRequest {
        const mechanicRequest = MechanicRequest.restore({
            id: raw.id,
            userId: raw.userId,
            cv: raw.cv,
            status: raw.status,
        })
        mechanicRequest.createdAt = raw.createdAt;
        mechanicRequest.updatedAt = raw.updatedAt;
        return mechanicRequest;
    }
}