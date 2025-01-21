import { DomainError } from "ddd";

export namespace ProfileErrors {
    export class ProfileNotFound extends DomainError{
        constructor() {
            super('PROFILE_NOT_FOUND')
        }
    }
}