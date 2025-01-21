import { DomainError } from 'ddd';

export namespace ScaErrors {
    export class OtpInvalid extends DomainError {
        constructor() {
            super('OTP_INVALID');
        }
    }
    export class IdentifierNotFound extends DomainError {
        constructor() {
            super('IDENTIFIER_NOT_FOUND');
        }
    }
}