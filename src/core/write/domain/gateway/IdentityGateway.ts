import {UserIdentity} from "ddd";

export interface IdentityGateway {
    encode(identity: UserIdentity): Promise<string>;
    verify(credential: string): Promise<UserIdentity>;
}