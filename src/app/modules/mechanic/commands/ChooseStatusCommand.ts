import {injectable} from "inversify";
import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {Expose, plainToClass} from "class-transformer";
import { RequestStatus } from "../../../../core/write/domain/types/RequestStatus";

@injectable()
export class ChooseStatusCommand {

    @Expose()
    @IsEnum(RequestStatus)
    @IsNotEmpty()
    status : RequestStatus

    static setProperties(cmd: ChooseStatusCommand): ChooseStatusCommand {
        return plainToClass(ChooseStatusCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}