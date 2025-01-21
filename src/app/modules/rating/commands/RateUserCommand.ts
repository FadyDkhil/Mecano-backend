import {injectable} from "inversify";
import {IsNotEmpty, IsNumber} from "class-validator";
import {Expose, plainToClass} from "class-transformer";

@injectable()
export class RateUserCommand {

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    rateNumber : number

    static setProperties(cmd: RateUserCommand): RateUserCommand {
        return plainToClass(RateUserCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}