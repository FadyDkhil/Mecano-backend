import { inject, injectable } from "inversify";
import { Usecase } from "ddd";
import { EventDispatcher } from "ddd";
import { ProfileRepository } from "../../domain/repositories/ProfileRepository";
import { Identifiers } from "../../../Identifiers";
import { ProfileErrors } from "../../domain/errors/ProfileErrors";

export interface AddProfilePictureProperties {
  id: string;
  profilePicture: string;
}

@injectable()
export class AddProfilePicture
  implements Usecase<AddProfilePictureProperties, void>
{
  constructor(
    @inject(Identifiers.profileRepository)
    private readonly profileRepository: ProfileRepository,
    @inject(EventDispatcher)
    private readonly eventDispatcher: EventDispatcher
  ) {}

  async execute(request?: AddProfilePictureProperties): Promise<void> {
    const profile = await this.profileRepository.getById(request.id);
    if (!profile) {
      throw new ProfileErrors.ProfileNotFound();
    }

    profile.addProfilePicture(request.profilePicture);

    await this.profileRepository.save(profile);
    await this.eventDispatcher.dispatch(profile);

  }
}
