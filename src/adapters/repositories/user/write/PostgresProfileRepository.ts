import { Profile } from "../../../../core/write/domain/aggregates/Profile";
import {ProfileRepository} from "../../../../core/write/domain/repositories/ProfileRepository";
import {ProfileEntityMapper} from "./mappers/ProfileEntityMapper";
import {ProfileEntity} from "./entities/ProfileEntity";
import {ProfileErrors} from "../../../../core/write/domain/errors/ProfileErrors";
import {injectable} from "inversify";

@injectable()
export class PostgresProfileRepository implements ProfileRepository {
    private _profileEntityMapper: ProfileEntityMapper
    
    constructor(
        private readonly entityManager: any
    ) {
        this._profileEntityMapper = new ProfileEntityMapper(this.entityManager)
    }
    async save(profile: Profile): Promise<void> {
        const profileRepo = this.entityManager.getRepository(ProfileEntity)
        const profileEntity = this._profileEntityMapper.fromDomain(profile)
        await profileRepo.save(profileEntity)
    }
    async getById(id: string): Promise<Profile> {
        const profileRepo = this.entityManager.getRepository(ProfileEntity)
        const profileEntity = await profileRepo.findOne({
            where: {
                id
            }
        })
        if (!profileEntity)
        {
            throw new ProfileErrors.ProfileNotFound()
        }
        return this._profileEntityMapper.toDomain(profileEntity)
    }

}