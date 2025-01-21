import {inject, injectable} from "inversify";
import {Profile} from "../../domain/aggregates/Profile";
import {Usecase} from "ddd";
import {Identifiers} from "../../../Identifiers";
import {EventDispatcher} from "ddd";
import { ProfileRepository } from "../../domain/repositories/ProfileRepository";
import { Gender } from "../../domain/types/Gender";


export interface CreateProfileInput {
    id: string;
    firstname: string;
    lastname: string;
    birthDate: Date;
    gender: Gender; 
}

@injectable()
export class CreateProfile implements Usecase<CreateProfileInput, Profile> {
    constructor(
        @inject(Identifiers.profileRepository)
        private readonly profileRepository: ProfileRepository,
        @inject(EventDispatcher)
        private readonly eventDispatcher: EventDispatcher
    ) {}

    async execute(request: CreateProfileInput): Promise<Profile> {
        const { id, firstname, lastname, birthDate, gender } = request;
        const profile = Profile.create({
            id,
            firstname,
            lastname,
            birthDate,
            gender
        });
        await this.profileRepository.save(profile);
        await this.eventDispatcher.dispatch(profile);
        return profile;
    }
}