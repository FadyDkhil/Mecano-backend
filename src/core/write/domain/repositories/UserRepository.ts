import {User} from "../aggregates/User";

export interface UserRepository {
    getByEmail(email: string): Promise<User>
    save(user : User) : Promise<void>;
    getById(id : string) : Promise<User>
    getByPhone(phone : string) : Promise<User>
    isEmailExists(email : string) : Promise<boolean>
}