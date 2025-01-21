import 'reflect-metadata';
import {Usecase} from "ddd";
import {User} from "../../domain/aggregates/User";
import {inject, injectable} from "inversify";
import {Identifiers} from "../../../Identifiers";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {PasswordGateway} from "../../domain/gateway/PasswordGateway";
import {EventDispatcher} from "ddd";
import {UserErrors} from "../../domain/errors/UserErrors";

export interface UserSignInInput {
    email: string;
    password: string;
}

@injectable()
export class SignIn implements Usecase<UserSignInInput, User> {
    constructor(
        @inject(Identifiers.userRepository)
        private readonly _userRepository: UserRepository,
        @inject(Identifiers.passwordGateway)
        private readonly _passwordGateway: PasswordGateway,
        @inject(EventDispatcher)
        private readonly _eventDispatcher: EventDispatcher
    ) {
    }
    
    async execute(payload: UserSignInInput): Promise<User> {
        const user = await this._userRepository.getByEmail(payload.email);
        if(!user) throw new UserErrors.UserNotFound();
        const passwordMatch = await this._passwordGateway.compare(payload.password, user.props.password);
        if(!passwordMatch) throw new UserErrors.PasswordInvalid();
        user.signIn();
        await this._userRepository.save(user);
        await this._eventDispatcher.dispatch(user);
        return user;
    }
}