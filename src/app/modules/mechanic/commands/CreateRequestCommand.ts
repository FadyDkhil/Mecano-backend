import {injectable} from "inversify";
import {IsNotEmpty, IsString} from "class-validator";
import {Expose, plainToClass} from "class-transformer";

@injectable()
export class CreateRequestCommand {

    @Expose()
    @IsString()
    @IsNotEmpty()
    mechanicId : string

    @Expose()
    @IsString()
    location : string

    @Expose()
    @IsString()
    reason : string

    static setProperties(cmd: CreateRequestCommand): CreateRequestCommand {
        return plainToClass(CreateRequestCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}