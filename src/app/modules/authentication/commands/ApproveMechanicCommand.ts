import {injectable} from "inversify";
import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {Expose, plainToClass} from "class-transformer";
import { RequestStatus } from "../../../../core/write/domain/types/RequestStatus";

@injectable()
export class ApproveMechanicCommand {

    @Expose()
    @IsEnum(RequestStatus)
    @IsNotEmpty()
    status : RequestStatus
   
    static setProperties(cmd: ApproveMechanicCommand): ApproveMechanicCommand {
        return plainToClass(ApproveMechanicCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}