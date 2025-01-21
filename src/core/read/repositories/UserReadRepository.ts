import { UserReadModel } from "../models/UserReadModel";

export interface UserReadRepository {
    getAll(): Promise<UserReadModel[]>;
}
