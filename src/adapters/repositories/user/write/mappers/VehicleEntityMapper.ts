import {Mapper} from "ddd";
import {EntityManager} from "typeorm";
import { Vehicle } from "../../../../../core/write/domain/aggregates/Vehicle";
import { VehicleEntity } from "../entities/VehicleEntity";

export class VehicleEntityMapper implements Mapper<VehicleEntity, Vehicle> {
    constructor(
        private readonly entityManager: EntityManager
    ) {
    }

fromDomain(param: Vehicle): VehicleEntity {
        return this.entityManager.create(VehicleEntity, {
            id: param.id,
            model: param.props.model,
            licensePlate: param.props.licensePlate,
            userId: param.props.userId
        })
    }

    toDomain(raw: VehicleEntity): Vehicle {
        const vehicle = Vehicle.restore({
            id: raw.id,
            model: raw.model,
            licensePlate: raw.licensePlate,
            userId: raw.userId
        })
        vehicle.createdAt = raw.createdAt;
        vehicle.updatedAt = raw.updatedAt;
        return vehicle;
    }
}