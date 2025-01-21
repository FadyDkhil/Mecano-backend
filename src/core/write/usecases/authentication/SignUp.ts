import {inject, injectable} from "inversify";
import {Identifiers} from "../../../Identifiers";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {PasswordGateway} from "../../domain/gateway/PasswordGateway";
import {UserErrors} from "../../domain/errors/UserErrors";
import {User} from "../../domain/aggregates/User";
import {Usecase} from "ddd";
import {EventDispatcher} from "ddd";


export interface SignupInput {
    email: string,
    password: string,
}

@injectable()
export class SignUp implements Usecase<SignupInput, User> {
    constructor(
        @inject(Identifiers.userRepository) private readonly _userRepository: UserRepository,
        @inject(Identifiers.passwordGateway) private readonly _passwordGateway: PasswordGateway,
        @inject(EventDispatcher) private readonly eventDispatcher: EventDispatcher
    ) {
    }

    async execute(payload: SignupInput): Promise<User> {
        let user = await this.ensureEmailExist(payload.email)
        if (user) {
            throw new UserErrors.EmailAlreadyUsed()
        }
        const password = await this._passwordGateway.encrypt(payload.password)
        user = User.signup({
            email: payload.email,
            password: password,
        })
        await this._userRepository.save(user);
        await this.eventDispatcher.dispatch(user);
        return user;
    }

    private async ensureEmailExist(email: string): Promise<User> {
        try {
            return await this._userRepository.getByEmail(email)
        } catch (e) {
            if (e instanceof UserErrors.UserNotFound) {
                return null;
            }
            throw e;
        }
    }
}