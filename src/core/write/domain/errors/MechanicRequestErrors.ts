import { DomainError } from "ddd";

export namespace MechanicReuqestErrors {

    export class MechanicReuqestNotFound extends DomainError{
        constructor() {
            super('MECHANIC_REQUEST_NOT_FOUND')
        }
    }

}