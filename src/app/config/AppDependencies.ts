import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import {Container} from "inversify";
import {Identifiers} from "../../core/Identifiers";
import {HandlersModule} from "../modules/handlers/HandlersModule";
import {
    dataSourceConfig, jwtConfig,
} from "./config";
import {DataSource} from "typeorm";
import {
    EventManager,
    MessageModule,
    MessageQueueEntity,
    PostgresEventRepository,
} from "messages-adapters";
import { SignIn } from "../../core/write/usecases/authentication/SignIn";
import { SignUp } from "../../core/write/usecases/authentication/SignUp";
import { CreateProfile } from "../../core/write/usecases/user/CreateProfile";
import { ActivateUser } from "../../core/write/usecases/user/ActivateUser";
import { IsEmailTaken } from "../../core/write/usecases/user/IsEmailTaken";
import { ResetPassword } from "../../core/write/usecases/user/ResetPassword";
import { GenerateRecoveryCode } from "../../core/write/usecases/user/GenerateRecoveryCode";
import { AddProfilePicture } from "../../core/write/usecases/user/AddProfilePicture";
import { SaveRecipient } from "../../core/write/usecases/notification/SaveRecipient";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { JwtIdentityGateway } from "../../adapters/gateways/jwt/JwtIdentityGateway";
import { UserController } from "../modules/authentication/UserController";
import { PostgresUserRepository } from "../../adapters/repositories/user/write/PostgresUserRepository";
import { PostgresProfileRepository } from "../../adapters/repositories/user/write/PostgresProfileRepository";
import { PostgresScaVerifierRepository } from "../../adapters/repositories/user/write/PostgresScaVerifierRepository";
import { UserEntity } from "../../adapters/repositories/user/write/entities/UserEntity";
import { ScaVerifierEntity } from "../../adapters/repositories/user/write/entities/ScaVerifierEntity";
import { BcryptPasswordGateway } from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { ProfileEntity } from "../../adapters/repositories/user/write/entities/ProfileEntity";
import { GetUserPersonalInformation } from "../../core/read/queries/GetUserPersonalInformation";
import { PostgresPersonalInformationReadRepository } from "../../adapters/repositories/user/read/PostgresPersonalInformationReadRepository";
import { VehicleEntity } from "../../adapters/repositories/user/write/entities/VehicleEntity";
import { PostgresVehicleRepository } from "../../adapters/repositories/user/write/PostgresVehicleRepository";
import { AttachVehicle } from "../../core/write/usecases/vehicle/AttachVehicle";
import { MechanicRequestEntity } from "../../adapters/repositories/user/write/entities/MechanicRequestEntity";
import { PostgresMechanicRequestRepository } from "../../adapters/repositories/user/write/PostgresMechanicRequestRepository";
import { BecomeMechanic } from "../../core/write/usecases/mechanic/BecomeMechanic";
import { RateUser } from "../../core/write/usecases/user/RateUser";
import { RateEntity } from "../../adapters/repositories/user/write/entities/RateEntity";
import { PostgresRateRepository } from "../../adapters/repositories/user/write/PostgresRateRepository";
import { RateController } from "../modules/rating/RateController";
import { VehicleController } from "../modules/vehicle/VehicleController";
import { CommonController } from "../modules/common/CommonController";
import { UpdateMechanicStatus } from "../../core/write/usecases/mechanic/UpdateMechanicStatus";
import { CreateRequest } from "../../core/write/usecases/mechanic/CreateRequest";
import { ChooseStatus } from "../../core/write/usecases/mechanic/ChooseStatus";
import { RequestingMechanicEntity } from "../../adapters/repositories/user/write/entities/RequestingMechanicEntity";
import { PostgresRequestingMechanicRepository } from "../../adapters/repositories/user/write/PostgresRequestingMechnicRepository";
import { MechanicController } from "../modules/mechanic/MechanicController";
import { GetMechanicRequests } from "../../core/read/queries/GetMechanicRequests";
import { PostgresMechanicRequestsReadRepository } from "../../adapters/repositories/user/read/PostgresMechanicRequestsReadRepository";
import { PostgresUserReadRepository } from "../../adapters/repositories/user/read/PostgresUserReadRepository";
import { GetUsers } from "../../core/read/queries/GetUsers";
import { PostgresMyRequestsReadRepository } from "../../adapters/repositories/user/read/PostgresMyRequestsReadRepository";
import { GetMyRequests } from "../../core/read/queries/GetMyRequests";

export class AppDependencies extends Container {
    async init() {
        const messageModule = new MessageModule(this);

        const myDataSource = new DataSource({
            ...dataSourceConfig,
            entities: [
                MessageQueueEntity,
                UserEntity,
                ProfileEntity,
                VehicleEntity,
                MechanicRequestEntity,
                RateEntity,
                RequestingMechanicEntity,
                ScaVerifierEntity,
                MechanicController
            ],
        });

        await myDataSource.initialize();

        this.bind(Identifiers.passwordGateway).toConstantValue(
            new BcryptPasswordGateway()
        );
        
        this.bind(Identifiers.scaVerifierRepository).toConstantValue(
            new PostgresScaVerifierRepository(myDataSource.manager)
        );
        
        this.bind(Identifiers.userRepository).toConstantValue(
            new PostgresUserRepository(myDataSource.manager)
        );
        this.bind(Identifiers.profileRepository).toConstantValue(
            new PostgresProfileRepository(myDataSource.manager)
        );
        this.bind(Identifiers.vehicleRepository).toConstantValue(
            new PostgresVehicleRepository(myDataSource.manager)
        );

        this.bind(Identifiers.rateRepository).toConstantValue(
            new PostgresRateRepository(myDataSource.manager)
        );

        this.bind(Identifiers.personalInformationReadModelRepository).toConstantValue(
            new PostgresPersonalInformationReadRepository(myDataSource.manager)
        );
        

        this.bind(Identifiers.mechanicRequestsReadModelRepository).toConstantValue(
            new PostgresMechanicRequestsReadRepository(myDataSource.manager)
        );
        
        this.bind(Identifiers.userReadModelRepository).toConstantValue(
            new PostgresUserReadRepository(myDataSource.manager)
        );

        
        this.bind(Identifiers.identityGateway).toConstantValue(
            new JwtIdentityGateway(jwtConfig.secret, jwtConfig.config)
        );

        this.bind(Identifiers.mechanicRequestRepository).toConstantValue(
            new PostgresMechanicRequestRepository(myDataSource.manager)
        );


        this.bind(Identifiers.requestingMechanicRepository).toConstantValue(
            new PostgresRequestingMechanicRepository(myDataSource.manager)
        );

        this.bind(Identifiers.myRequestsReadModelRepository).toConstantValue(
            new PostgresMyRequestsReadRepository(myDataSource.manager)
        );
        



        this.bind(AuthenticationMiddleware).toSelf();

        //controllers
        this.bind(UserController).toSelf();
        this.bind(RateController).toSelf();
        this.bind(VehicleController).toSelf();
        this.bind(CommonController).toSelf();
        this.bind(MechanicController).toSelf();

        //user
        this.bind(SignIn).toSelf();
        this.bind(Identifiers.signUp).to(SignUp);
        this.bind(CreateProfile).toSelf();
        this.bind(ActivateUser).toSelf();
        this.bind(SaveRecipient).toSelf();
        this.bind(IsEmailTaken).toSelf();
        this.bind(ResetPassword).toSelf();
        this.bind(GenerateRecoveryCode).toSelf();
        this.bind(AddProfilePicture).toSelf();
        this.bind(GetUserPersonalInformation).toSelf();

        //vehicle
        this.bind(AttachVehicle).toSelf();

        //mechanic
        this.bind(BecomeMechanic).toSelf();
        this.bind(UpdateMechanicStatus).toSelf();
        this.bind(GetMechanicRequests).toSelf();
        this.bind(GetUsers).toSelf();
        
        

        //rate
        this.bind(RateUser).toSelf();

        //requesting mechanic
        this.bind(CreateRequest).toSelf();
        this.bind(ChooseStatus).toSelf();
        this.bind(GetMyRequests).toSelf();


        messageModule.configure({
            dataSource: new PostgresEventRepository(myDataSource.manager),
        });

        await messageModule.register((em: EventManager) => {
            HandlersModule.configureHandlers(em);
        });

        return this;
    }
}
