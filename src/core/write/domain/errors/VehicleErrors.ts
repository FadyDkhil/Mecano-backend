import { DomainError } from "ddd";

export namespace VehicleErrors {
    export class VehicleNotFound extends DomainError{
        constructor() {
            super('VEHICLE_NOT_FOUND')
        }
    }
}