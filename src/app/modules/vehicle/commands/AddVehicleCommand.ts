import {injectable} from "inversify";
import {IsNotEmpty, IsString} from "class-validator";
import {Expose, plainToClass} from "class-transformer";

@injectable()
export class AddVehicleCommand {
    @Expose()
    @IsString()
    model : string

    @Expose()
    @IsString()
    @IsNotEmpty()
    licensePlate : string

    static setProperties(cmd: AddVehicleCommand): AddVehicleCommand {
        return plainToClass(AddVehicleCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}