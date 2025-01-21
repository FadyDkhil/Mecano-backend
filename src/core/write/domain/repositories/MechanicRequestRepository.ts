import { MechanicRequest } from "../aggregates/MechanicRequest";

export interface MechanicRequestRepository {
    save(mechanicRequest: MechanicRequest): Promise<void>;
    getById(id: string): Promise<MechanicRequest>;
}