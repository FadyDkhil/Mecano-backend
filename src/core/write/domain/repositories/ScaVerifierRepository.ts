import {ScaVerifier} from "../aggregates/ScaVerifier";

export interface ScaVerifierRepository {
    save(sca: ScaVerifier): Promise<void>;
    findById(identifier: string): Promise<ScaVerifier>;
    findByPhone(phoneNumber: string): Promise<ScaVerifier>;
}
