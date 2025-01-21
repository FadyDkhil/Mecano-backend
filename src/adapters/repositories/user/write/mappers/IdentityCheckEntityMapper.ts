import {EntityManager} from "typeorm";
import {IdentityCheck} from "../../../../../core/write/domain/aggregates/IdentityCheck";
import {Mapper} from "../../../../../packages/tools/ddd/src";
import {IdentityCheckEntity} from "../entities/IdentityCheckEntity";

export class IdentityCheckEntityMapper
    implements Mapper<IdentityCheckEntity, IdentityCheck>
{
    constructor(private readonly entityManager: EntityManager) {}

    fromDomain(param: IdentityCheck): IdentityCheckEntity {
        return this.entityManager.create(IdentityCheckEntity, {
            id: param.id,
            userId : param.props.userId,
            workflowId : param.props.workflowId,
            applicantId : param.props.applicantId,
            result : param.props.result,
            startedAt : param.props.startedAt,
            endedAt : param.props.endedAt
        });
    }

    toDomain(raw: IdentityCheckEntity): IdentityCheck {
        const identityCheck = IdentityCheck.restore({
            id: raw.id,
            userId: raw.userId,
            workflowId: raw.workflowId,
            applicantId: raw.applicantId,
            result: raw.result,
            startedAt: raw.startedAt,
            endedAt: raw.endedAt
        })
        return identityCheck
    }
}
