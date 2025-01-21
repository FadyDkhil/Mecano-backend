import {inject, injectable} from "inversify";
import {Usecase} from "ddd";
import {Identifiers} from "../../../Identifiers";
import {EventDispatcher} from "ddd";
import {UserIdentity} from "ddd";
import {UserRole} from "../../domain/types/UserRole";
import { Vehicle } from "../../domain/aggregates/Vehicle";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export interface AddVehicleInput {
    model: string;
    licensePlate: string;
    userId: string;
}

@injectable()
export class AttachVehicle implements Usecase<AddVehicleInput, Vehicle> {
    constructor(
        @inject(Identifiers.vehicleRepository)
        private readonly vehicleRepository: VehicleRepository,
        @inject(EventDispatcher)
        private readonly eventDispatcher: EventDispatcher
    ) {}

    async execute(request: AddVehicleInput): Promise<Vehicle> {
        const {  model, licensePlate, userId } = request;
        let vehicle = await this.vehicleRepository.getbyUserId(userId)
        if (!vehicle) {
            vehicle = Vehicle.add({
                model,
                licensePlate,
                userId,
            });
        } else {
            vehicle.update({
                model,
                licensePlate,
            })
        }

        await this.vehicleRepository.save(vehicle);
        await this.eventDispatcher.dispatch(vehicle);
        return vehicle;
    }

    async canExecute(identity: UserIdentity, request?: AddVehicleInput): Promise<boolean> {
       return  identity.id === request.userId || identity.role >= UserRole.USER;
    }
}