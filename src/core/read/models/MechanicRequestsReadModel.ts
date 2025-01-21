import { Gender } from "../../write/domain/types/Gender";
import { RequestStatus } from "../../write/domain/types/RequestStatus";

export interface MechanicRequestsReadModel {
    id: string;
    userId: string;
    cv?: string;
    status: RequestStatus;
    profile: {
        firstName: string;
        lastName: string;
        birthDate: Date;
        gender: Gender;
        createdAt?: Date;
        updatedAt?: Date;
        profilePicture?: string;
    };
}