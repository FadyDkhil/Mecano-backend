import "reflect-metadata";
import {Application, Request, Response} from "express";
import {useExpressServer, useContainer} from "routing-controllers";
import {AppDependencies} from "./AppDependencies";
import bodyParser from "body-parser";
import { UserController } from "../modules/authentication/UserController";
import { VehicleController } from "../modules/vehicle/VehicleController";
import { RateController } from "../modules/rating/RateController";
import { MechanicController } from "../modules/mechanic/MechanicController";


export async function configureExpress(app: Application) {
    app.use(
        bodyParser.json({
            limit: "500kb",
            verify: function (req: Request, res: Response, buf: Buffer) {
                const url = req.originalUrl;
                if (url === `/`) {
                    req["rawBody"] = buf.toString();
                }
            },
        })
    );

    const routes = [
        UserController,
        RateController,
        VehicleController,
        MechanicController
    ];

    const container = await new AppDependencies().init();
    
    useContainer(container);

    useExpressServer(app, {
        controllers: routes,
    });
    return container;
}
