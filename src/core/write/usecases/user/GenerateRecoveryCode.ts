import {inject, injectable} from "inversify";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {UserErrors} from "../../domain/errors/UserErrors";
import {Usecase} from "ddd";
import {EventDispatcher} from "ddd";
import {Identifiers} from "../../../Identifiers";


export interface GenerateRecoveryCodeInput {
  email: string;
}

@injectable()
export class GenerateRecoveryCode implements Usecase<GenerateRecoveryCodeInput, void> {

  constructor(
    @inject(Identifiers.userRepository)
    private readonly userRepository: UserRepository,
    @inject(EventDispatcher)
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(request: GenerateRecoveryCodeInput): Promise<void> {
    const { email } = request;
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new UserErrors.UserNotFound();
    }
    user.generateRecoveryCode();
    await this.userRepository.save(user);
    await this.eventDispatcher.dispatch(user);
    return;
  }
}
