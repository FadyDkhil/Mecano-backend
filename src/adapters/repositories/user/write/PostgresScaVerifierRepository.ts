import 'reflect-metadata';
import {injectable} from 'inversify';
import {EntityManager} from 'typeorm';
import {ScaVerifierRepository} from "../../../../core/write/domain/repositories/ScaVerifierRepository";
import {ScaVerifiersEntityMapper} from "./mappers/ScaVerifiersEntityMapper";
import {ScaVerifierEntity} from "./entities/ScaVerifierEntity";
import { ScaVerifier } from '../../../../core/write/domain/aggregates/ScaVerifier';



@injectable()
export class PostgresScaVerifierRepository implements ScaVerifierRepository {

    private scaVerifierEntityMapper: ScaVerifiersEntityMapper;


    constructor(
        private readonly entityManager: EntityManager
    ) {
        this.scaVerifierEntityMapper = new ScaVerifiersEntityMapper(entityManager);
    }

    async deleteByPhone(phone: string): Promise<void> {
        const scaVerifierRepository = this.entityManager.getRepository(ScaVerifierEntity);
        await scaVerifierRepository.delete({
            phone: phone
        });
    }

    async save(invitation: ScaVerifier): Promise<void> {
        const scaVerifierRepository = this.entityManager.getRepository(ScaVerifierEntity);
        const scaVerifierEntity = this.scaVerifierEntityMapper.fromDomain(invitation);
        await scaVerifierRepository.save(scaVerifierEntity);
        return;
    }

    async findById(identifier: string): Promise<ScaVerifier> {
        const scaVerifierRepository = this.entityManager.getRepository(ScaVerifierEntity);
        const scaVerifier = await scaVerifierRepository.findOne({
            where: {
                id: identifier
            }
        });
        return this.scaVerifierEntityMapper.toDomain(scaVerifier);
    }

    async findByPhone(phoneNumber: string): Promise<ScaVerifier> {
        const scaVerifierRepository = this.entityManager.getRepository(ScaVerifierEntity);
        const scaVerifier = await scaVerifierRepository.findOne({
            where: {
                phone: phoneNumber
            }
        });
        return this.scaVerifierEntityMapper.toDomain(scaVerifier);
    }
}
