import {ProfileEntity} from "../entities/ProfileEntity";
import {Profile} from "../../../../../core/write/domain/aggregates/Profile";
import {Mapper} from "ddd";
import {EntityManager} from "typeorm";

export class ProfileEntityMapper implements Mapper<ProfileEntity, Profile> {
    constructor(
        private readonly entityManager: EntityManager
    ) {
    }

fromDomain(param: Profile): ProfileEntity {
        return this.entityManager.create(ProfileEntity, {
            id: param.id,
            firstName: param.props.firstname,
            lastName: param.props.lastname,
            birthDate: param.props.birthDate,
            gender: param.props.gender,
            profilePicture : param.props.profilePicture,
            cv: param.props.cv
        })
    }

    toDomain(raw: ProfileEntity): Profile {
        const profile = Profile.restore({
            id: raw.id,
            firstname: raw.firstName,
            lastname: raw.lastName,
            birthDate: raw.birthDate,
            gender: raw.gender,
            profilePicture : raw.profilePicture,
            cv: raw.cv,
        })
        profile.createdAt = raw.createdAt;
        profile.updatedAt = raw.updatedAt;
        return profile;
    }
}