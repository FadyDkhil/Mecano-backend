import { MechanicRequestsReadModel } from "../models/MechanicRequestsReadModel";

export interface MechanicRequestsReadModelRepository {
    getAll(): Promise<MechanicRequestsReadModel[]>;
}
