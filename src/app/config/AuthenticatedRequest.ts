import { Request } from "express";
import {UserIdentity} from "ddd";


export interface AuthenticatedRequest extends Request {
    identity: UserIdentity;
}