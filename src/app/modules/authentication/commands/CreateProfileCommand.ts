import {injectable} from "inversify";
import {IsEnum, IsISO8601, IsNotEmpty, IsString} from "class-validator";
import {Expose, plainToClass} from "class-transformer";
import { Gender } from "../../../../core/write/domain/types/Gender";

@injectable()
export class CreateProfileCommand {

    @Expose()
    @IsString()
    @IsNotEmpty()
    firstname : string

    @Expose()
    @IsString()
    @IsNotEmpty()
    lastname : string

    @Expose()
    @IsISO8601()
    birthDate : Date

    @Expose()
    @IsEnum(Gender)
    gender : Gender

    static setProperties(cmd: CreateProfileCommand): CreateProfileCommand {
        return plainToClass(CreateProfileCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}