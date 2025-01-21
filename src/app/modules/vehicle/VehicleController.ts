import { validateOrReject } from "class-validator";
import { inject, injectable } from "inversify";
import { Body, JsonController, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import { Identifiers } from "../../../core/Identifiers";
import { IdentityGateway } from "../../../core/write/domain/gateway/IdentityGateway";
import { AttachVehicle } from "../../../core/write/usecases/vehicle/AttachVehicle";
import { AuthenticatedRequest } from "../../config/AuthenticatedRequest";
import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";
import { AddVehicleCommand } from "./commands/AddVehicleCommand";
import {Response} from "express";

@injectable()
@JsonController("/vehicle")
export class VehicleController {

    constructor(
        @inject(Identifiers.identityGateway)
        private readonly _identityGateway: IdentityGateway,
        @inject(AttachVehicle)
        private readonly _attachVehicle: AttachVehicle,
    ) {}

    
    @UseBefore(AuthenticationMiddleware)
    @Post("/add")
    async AddVehicle(
        @Res() res: Response,
        @Req() req: AuthenticatedRequest,
        @Body() cmd: AddVehicleCommand
    ) {
        const body = AddVehicleCommand.setProperties(cmd);
        await validateOrReject(body);
        const {model, licensePlate} = body;
        const result = await this._attachVehicle.execute({
            model,
            licensePlate,
            userId: req.identity.id,
        });
        return res.status(200).send(result.props);
    }

    @UseBefore(AuthenticationMiddleware)
    @Put("/update")
    async updateVehicle(
        @Res() res: Response,
        @Req() req: AuthenticatedRequest,
        @Body() cmd: AddVehicleCommand
    ) {
        const body = AddVehicleCommand.setProperties(cmd);
        await validateOrReject(body);

        const {model, licensePlate} = body;

        const result = await this._attachVehicle.execute({
            model,
            licensePlate,
            userId: req.identity.id
        });

        return res.status(200).send(result.props);
    }

}
