import {injectable} from "inversify";
import { Vehicle } from "../../../../core/write/domain/aggregates/Vehicle";
import { VehicleErrors } from "../../../../core/write/domain/errors/VehicleErrors";
import { VehicleRepository } from "../../../../core/write/domain/repositories/VehicleRepository";
import { VehicleEntity } from "./entities/VehicleEntity";
import { VehicleEntityMapper } from "./mappers/VehicleEntityMapper";


@injectable()
export class PostgresVehicleRepository implements VehicleRepository {
    private _vehicleEntityMapper: VehicleEntityMapper;
    
    constructor(
        private readonly entityManager: any
    ) {
        this._vehicleEntityMapper = new VehicleEntityMapper(this.entityManager)
    }
    async getbyUserId(userId: string): Promise<Vehicle> {
        const vehicleRepo = this.entityManager.getRepository(VehicleEntity)
        const vehicleEntity = await vehicleRepo.findOne({
            where : {
                userId
            }
        })
        if (!vehicleEntity) {
            return null;
        }
        return this._vehicleEntityMapper.toDomain(vehicleEntity)
    }



    async save(vehicle: Vehicle): Promise<void> {
        const vehicleRepo = this.entityManager.getRepository(VehicleEntity)
        const vehicleEntity = this._vehicleEntityMapper.fromDomain(vehicle)
        await vehicleRepo.save(vehicleEntity)
    }
    async getById(id: string): Promise<Vehicle> {
        const vehicleRepo = this.entityManager.getRepository(VehicleEntity)
        const vehicleEntity = await vehicleRepo.findOne({
            where: {
                id
            }
        })
        if (!vehicleEntity)
        {
            throw new VehicleErrors.VehicleNotFound()
        }
        return this._vehicleEntityMapper.toDomain(vehicleEntity)
    }

}