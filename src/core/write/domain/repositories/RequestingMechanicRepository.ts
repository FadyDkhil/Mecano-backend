import { RequestingMechanic } from "../aggregates/RequestingMechanic";

export interface RequestingMechanicRepository {
    save(requesting: RequestingMechanic): Promise<void>;
    getById(id: string): Promise<RequestingMechanic>;
}