import { DomainError } from "ddd";

export namespace MechanicErrors {

    export class RequestNotFound extends DomainError{
        constructor() {
            super('REQUEST_NOT_FOUND')
        }
    }

}