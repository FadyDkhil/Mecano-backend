import {Expose, plainToClass} from "class-transformer";
import {IsString} from "class-validator";

export class GenerateIdentificationCommand {
    @Expose()
    @IsString()
    phone: string;

    static setProperties(cmd: GenerateIdentificationCommand):  GenerateIdentificationCommand {
        return plainToClass(GenerateIdentificationCommand, cmd, { excludeExtraneousValues: true });
    }
}
