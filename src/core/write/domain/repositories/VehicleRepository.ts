import {Vehicle} from "../aggregates/Vehicle";

export interface VehicleRepository {
    save(vehicle: Vehicle): Promise<void>;
    getById(id: string): Promise<Vehicle>;
    getbyUserId(userId: string): Promise<Vehicle>;
}