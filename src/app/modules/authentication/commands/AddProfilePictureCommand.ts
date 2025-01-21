import {injectable} from "inversify";
import { IsString } from "class-validator";
import {Expose, plainToClass} from "class-transformer";

@injectable()
export class AddProfilePictureCommand {

    @Expose()
    @IsString()
    profilePicture : string

    static setProperties(cmd: AddProfilePictureCommand): AddProfilePictureCommand {
        return plainToClass(AddProfilePictureCommand, cmd, {
            excludeExtraneousValues: true
        })
    }
}