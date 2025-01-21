import {AccountStatus} from "../../write/domain/types/AccountStatus";
import { Gender } from "../../write/domain/types/Gender";

export interface PersonalInformationReadModel {
    id: string;
    email: string;
    phone: string;
    signInAt: Date;
    status: AccountStatus;
    recoveryCode: string;
    createdAt?: Date;
    updatedAt?: Date;
    profile: {
        firstName: string;
        lastName: string;
        birthDate: Date;
        gender: Gender;
        cv?: string;
        createdAt?: Date;
        updatedAt?: Date;
        profilePicture?: string;
    };
}
