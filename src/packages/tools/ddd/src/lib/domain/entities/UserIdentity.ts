import {IdentityRole} from "../types/IdentityRole";

export interface UserIdentity {
  id: string;
  phone?: string;
  email: string;
  role?: IdentityRole;
}
