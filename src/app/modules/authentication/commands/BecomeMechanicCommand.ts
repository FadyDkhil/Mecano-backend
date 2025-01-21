import {injectable} from "inversify";
import {IsNotEmpty, IsString} from "class-validator";
import {Expose, plainToClass} from "class-transformer";

@injectable()
export class BecomeMechanicCommand {

    @Expose()
    @IsString()
    @IsNotEmpty()
    cv : string
   
    static setProperties(cmd: BecomeMechanicCommand): BecomeMechanicCommand {
        return plainToClass(BecomeMechanicCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}