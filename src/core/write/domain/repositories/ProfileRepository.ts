import {Profile} from "../aggregates/Profile";

export interface ProfileRepository {
    save(profile: Profile): Promise<void>;
    getById(id: string): Promise<Profile>;
}