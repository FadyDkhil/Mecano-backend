import "reflect-metadata";
import {EntityManager} from "typeorm";
import {ScaVerifierEntity} from "../entities/ScaVerifierEntity";
import {Mapper} from "ddd";
import {ScaVerifier} from "../../../../../core/write/domain/aggregates/ScaVerifier";

export class ScaVerifiersEntityMapper
    implements Mapper<ScaVerifierEntity, ScaVerifier>
{
    constructor(private readonly entityManager: EntityManager) {}

    fromDomain(t: ScaVerifier): ScaVerifierEntity {
        return this.entityManager.create(ScaVerifierEntity, {
            id: t.props.id,
            phone: t.props.phone,
            tenant: t.props.tenant,
            completedAt: t.props.completedAt,
            code: t.props.code,
            contextId: t.props.contextId,
        });
    }

    toDomain(raw: ScaVerifierEntity): ScaVerifier {
        return ScaVerifier.restore({
            id: raw.id,
            phone: raw.phone,
            tenant: raw.tenant,
            completedAt: raw.completedAt,
            code: raw.code,
            contextId: raw.contextId,
        });
    }
}
