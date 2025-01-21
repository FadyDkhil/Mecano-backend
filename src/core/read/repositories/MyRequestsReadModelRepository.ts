import { MyRequestsReadModel } from "../models/MyRequestsReadModel";

export interface MyRequestsReadModelRepository {
    getAll(mechanicId: string): Promise<MyRequestsReadModel[]>;
}
