import { UserRole } from "../../write/domain/types/UserRole"; // Adjust if necessary
import { AccountStatus } from "../../write/domain/types/AccountStatus"; // Adjust if necessary
import { Gender } from "../../write/domain/types/Gender"; // Adjust if necessary

export interface UserReadModel {
    id: string;
    email: string;
    phone?: string;
    averageRate?: number;
    profile: {
        firstName: string;
        lastName: string;
        gender: Gender;
        birthDate: Date;
        profilePicture?: string;
        cv?: string;
        createdAt?: Date;
        updatedAt?: Date;
    };
}
