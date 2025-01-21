import {inject, injectable} from "inversify";
import {Body, Get, JsonController, Param, Post, Res} from "routing-controllers";
import {Response} from "express";
import {verify} from "jsonwebtoken";
import * as process from "process";
import {ActivateUser} from "../../../core/write/usecases/user/ActivateUser";
import {validateOrReject} from "class-validator";
import {IsEmailAvailableCommand} from "./commands/IsEmailAvailableCommand";
import {IsEmailTaken} from "../../../core/write/usecases/user/IsEmailTaken";

@injectable()
@JsonController('/common')
export class CommonController {

    constructor(
        @inject(ActivateUser)
        private readonly _activateUser: ActivateUser,
        @inject(IsEmailTaken)
        private readonly _isEmailTaken: IsEmailTaken
    ) {
    }

    @Get('/:encrypted_id')
    async getAccountLink(
        @Res() res: Response,
        @Param('encrypted_id') encryptedId: string
    ) {
        const payload = verify(encryptedId, process.env.JWT_SECRET) as any;
        await this._activateUser.execute({userId: payload.id})
        return res.redirect(301, process.env.FRONTEND_URL + '/login')
    }

    @Post('/email')
    async isEmailTaken(@Res() res: Response, @Body() cmd: IsEmailAvailableCommand) {
        const body = IsEmailAvailableCommand.setProperties(cmd);
        await validateOrReject(body);
        const result = await this._isEmailTaken.execute({username: body.email})
        return res.status(200).send({taken: result})
    }


}
