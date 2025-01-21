import {UserIdentity} from "ddd";

export const mockIdentityRequest = (identity: UserIdentity) => {
  return {
    identity: identity
  }
}
