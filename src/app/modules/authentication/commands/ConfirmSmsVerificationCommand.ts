import {Expose, plainToClass} from "class-transformer";
import {IsString, IsUUID, Length} from "class-validator";

export class ConfirmSmsVerificationCommand {
    @Expose()
    @IsString()
    @Length(4, 10)
    code: string;

    @Expose()
    @IsUUID()
    identifier : string;

    static setProperties(cmd: ConfirmSmsVerificationCommand):  ConfirmSmsVerificationCommand {
        return plainToClass(ConfirmSmsVerificationCommand, cmd, { excludeExtraneousValues: true });
    }
}