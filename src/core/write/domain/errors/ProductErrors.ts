import { DomainError } from "ddd";

export namespace ProductErrors {
    export class ProductExist extends DomainError{
        constructor() {
            super('PRODUCT_ALREADY_EXISTS')
        }
    }

    export class ProductNotFound extends DomainError{
        constructor() {
            super('PRODUCT_NOT_FOUND')
        }
    }

}