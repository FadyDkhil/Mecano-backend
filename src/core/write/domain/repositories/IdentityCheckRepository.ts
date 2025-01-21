import {IdentityCheck} from "../aggregates/IdentityCheck";

export interface IdentityCheckRepository {
    save(identityCheck: IdentityCheck): Promise<void>;
    getById(id:string): Promise<IdentityCheck>;
    getByApplicantId(applicantId: string): Promise<IdentityCheck>;
}
