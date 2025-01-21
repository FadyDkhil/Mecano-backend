import {EntityManager} from "typeorm";
import {UserEntityMapper} from "./mappers/UserEntityMapper";
import {UserRepository} from "../../../../core/write/domain/repositories/UserRepository";
import {User} from "../../../../core/write/domain/aggregates/User";
import {UserEntity} from "./entities/UserEntity";

export class PostgresUserRepository implements UserRepository {
    private readonly userEntityMapper: UserEntityMapper;

    constructor(private readonly entityManager: EntityManager) {
        this.userEntityMapper = new UserEntityMapper(this.entityManager);
    }

    async isEmailExists(email: string): Promise<boolean> {
        const userRepo = this.entityManager.getRepository(UserEntity);
        const userEntity = await userRepo.findOne({
            where: {
                email,
            },
        });
        return !!userEntity;
    }

    async getByPhone(phone: string): Promise<User> {
        const userRepo = this.entityManager.getRepository(UserEntity);
        const userEntity = await userRepo.findOne({
            where: {
                phone,
            },
        });
        if (!userEntity) return null;
        return this.userEntityMapper.toDomain(userEntity);
    }

    async getById(id: string): Promise<User> {
        const userRepo = this.entityManager.getRepository(UserEntity);
        const userEntity = await userRepo.findOne({
            where: {
                id,
            },
        });
        if (!userEntity) return null;
        return this.userEntityMapper.toDomain(userEntity);
    }

    async getByEmail(email: string): Promise<User> {
        const userRepo = this.entityManager.getRepository(UserEntity);
        const userEntity = await userRepo.findOne({
            where: {
                email,
            },
        });
        if (!userEntity) return null;
        return this.userEntityMapper.toDomain(userEntity);
    }

    async save(user: User): Promise<void> {
        const userRepo = this.entityManager.getRepository(UserEntity);
        const userEntity = this.userEntityMapper.fromDomain(user);
        await userRepo.save(userEntity);
    }
}
