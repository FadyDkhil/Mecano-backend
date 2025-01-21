import { validateOrReject } from "class-validator";
import { inject, injectable } from "inversify";
import { Body, JsonController, Param, Post, Req, Res, UseBefore } from "routing-controllers";
import { Identifiers } from "../../../core/Identifiers";
import { IdentityGateway } from "../../../core/write/domain/gateway/IdentityGateway";
import { AuthenticatedRequest } from "../../config/AuthenticatedRequest";
import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";
import {Response} from "express";
import { RateUserCommand } from "./commands/RateUserCommand";
import { RateUser } from "../../../core/write/usecases/user/RateUser";

@injectable()
@JsonController("/rate")
export class RateController {

    constructor(
        @inject(Identifiers.identityGateway)
        private readonly _identityGateway: IdentityGateway,
        @inject(RateUser)
        private readonly _rateUser: RateUser,
    ) {}

    
    @UseBefore(AuthenticationMiddleware)
    @Post("/:ratedId")
    async rateUser(
        @Res() res: Response,
        @Req() req: AuthenticatedRequest,
        @Body() cmd: RateUserCommand,
        @Param("ratedId") ratedId: string,
    ) {
        const body = RateUserCommand.setProperties(cmd);
        await validateOrReject(body);
        const {rateNumber} = body;
        const result = await this._rateUser.execute({
            userId: req.identity.id,
            mechanicId: ratedId,
            rateNumber: rateNumber,
        });
        return res.status(200).send(result.props);
    }

}