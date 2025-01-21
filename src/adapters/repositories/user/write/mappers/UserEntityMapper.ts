import {UserEntity} from "../entities/UserEntity";
import {User} from "../../../../../core/write/domain/aggregates/User";
import {EntityManager} from "typeorm";
import {Mapper} from "ddd";

export class UserEntityMapper implements Mapper<UserEntity, User> {
    constructor(private readonly entityManager: EntityManager) {}
    fromDomain(param: User): UserEntity {
        return this.entityManager.create(UserEntity, {
            id: param.id,
            email: param.props.email,
            phone: param.props.phone,
            password: param.props.password,
            signInAt: param.props.signInAt,
            role: param.props.role,
            recoveryCode: param.props.recoveryCode,
            createdAt: param.createdAt,
            updatedAt: param.updatedAt,
            status: param.props.status,
        });
    }

    toDomain(raw: UserEntity): User {
        const user = User.restore({
            email: raw.email,
            phone: raw.phone,
            signInAt: raw.signInAt,
            role: raw.role,
            password: raw.password,
            recoveryCode: raw.recoveryCode,
            id: raw.id,
            status: raw.status,
        });
        user.createdAt = raw.createdAt;
        user.updatedAt = raw.updatedAt;
        return user;
    }
}
