export interface MyRequestsReadModel {
    id: string;
    userId: string;
    mechanicId: string;
    location: string;
    reason: string;
    profile: {
        firstName: string;
        lastName: string;
        gender: string;
        birthDate: Date;
        profilePicture?: string;
        createdAt?: Date;
        updatedAt?: Date;
    };
    vehicle: {
        id: string;
        model: string;
        licensePlate: string;
    };
}
