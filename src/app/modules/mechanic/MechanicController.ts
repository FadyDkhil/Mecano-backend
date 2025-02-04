import { validateOrReject } from "class-validator";
import { inject, injectable } from "inversify";
import { Body, Get, JsonController, Param, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import { Identifiers } from "../../../core/Identifiers";
import { IdentityGateway } from "../../../core/write/domain/gateway/IdentityGateway";
import { AuthenticatedRequest } from "../../config/AuthenticatedRequest";
import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";
import {Response} from "express";
import { CreateRequest } from "../../../core/write/usecases/mechanic/CreateRequest";
import { CreateRequestCommand } from "./commands/CreateRequestCommand";
import { ChooseStatusCommand } from "./commands/ChooseStatusCommand";
import { ChooseStatus } from "../../../core/write/usecases/mechanic/ChooseStatus";
import { GetMechanicRequests } from "../../../core/read/queries/GetMechanicRequests";
import { GetUsers } from "../../../core/read/queries/GetUsers";
import { GetMyRequests } from "../../../core/read/queries/GetMyRequests";
import { UnAuthorizedAction } from "../../config/models/UnAuthorizedAction";

@injectable()
@JsonController("/mechanic")
export class MechanicController {

    constructor(
        @inject(Identifiers.identityGateway)
        private readonly _identityGateway: IdentityGateway,
        @inject(CreateRequest)
        private readonly _createRequest: CreateRequest,
        @inject(ChooseStatus)
        private readonly _chooseStatus: ChooseStatus,
        @inject(GetMechanicRequests)
        private readonly _getMechanicRequests: GetMechanicRequests,
        @inject(GetUsers)
        private readonly _getUsers: GetUsers,
        @inject(GetMyRequests)
        private readonly _getMyRequests: GetMyRequests,
        
    ) {}

    
    @UseBefore(AuthenticationMiddleware)
    @Post("/create")
    async createRequest(
        @Res() res: Response,
        @Req() req: AuthenticatedRequest,
        @Body() cmd: CreateRequestCommand
    ) {
        const body = CreateRequestCommand.setProperties(cmd);
        await validateOrReject(body);
        const {mechanicId, location, reason} = body;
        const result = await this._createRequest.execute({
            userId: req.identity.id,
            mechanicId,
            location,
            reason
        });
        return res.status(200).send(result.props);
    }

    @UseBefore(AuthenticationMiddleware)
    @Put("/update/:id")
    async chooseStatus(
        @Req() req: AuthenticatedRequest,
        @Res() res: Response,
        @Body() cmd: ChooseStatusCommand,
        @Param("id") id: string,
    ) {
        const body = ChooseStatusCommand.setProperties(cmd);
        await validateOrReject(body);
        // const isAuthorized =  await this._chooseStatus.canExecute(
        //     req.identity
        // );

        // if (!isAuthorized) {
        //     return UnAuthorizedAction(res);
        // }

        const result = await this._chooseStatus.execute({
            id: id,
            userId: req.identity.id,
            status: body.status,
        });
       return res.status(200).send(result);
    }

    @UseBefore(AuthenticationMiddleware)
    @Get("/getMechanicRequests")
    async getMechanicRequests(
        @Res() res: Response,
        @Req() req: AuthenticatedRequest
    ) {
        const mechanicRequest = await this._getMechanicRequests.execute();
        return res.status(200).send(mechanicRequest);
    }

    @UseBefore(AuthenticationMiddleware)
    @Get("/getMechanics")
    async getMechanics(
        @Res() res: Response,
        @Req() req: AuthenticatedRequest
    ) {
        const mechanics = await this._getUsers.execute();
        return res.status(200).send(mechanics);
    }

    @UseBefore(AuthenticationMiddleware)
    @Get("/getMyRequests")
    async getMyRequests(
        @Res() res: Response,
        @Req() req: AuthenticatedRequest
    ) {
        const mechanics = await this._getMyRequests.execute(req.identity.id);
        return res.status(200).send(mechanics);
    }

   
}
