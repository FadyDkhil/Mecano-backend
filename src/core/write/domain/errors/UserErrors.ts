import { DomainError } from "ddd";

export namespace UserErrors {
    export class PasswordInvalid extends DomainError{
        constructor() {
            super('PASSWORD_INVALID')
        }
    }
    export class PhoneNumberAlreadyUsed extends DomainError{
        constructor() {
            super('PHONE_NUMBER_ALREADY_USED')
        }
    }
    export class EmailAlreadyUsed extends DomainError{
        constructor() {
            super('EMAIL_ALREADY_USED')
        }
    }
    export class PhoneNumberNotVerified extends DomainError{
        constructor() {
            super('PHONE_NUMBER_NOT_VERIFIED')
        }
    }
    export class PhoneNumberDoesNotExist extends DomainError{
        constructor() {
            super('PHONE_NUMBER_DOES_NOT_EXIST')
        }
    }

    export class UserNotFound extends DomainError{
        constructor() {
            super('USER_NOT_FOUND')
        }
    }

    export class UserNotActive extends DomainError{
        constructor() {
            super('USER_NOT_ACTIVE')
        }
    }

    export class InvalidEmailFormat extends DomainError{
        constructor() {
            super('INVALID_EMAIL_FORMAT')
        }
    }

    export class AuthenticationFailed extends DomainError{
        constructor() {
            super('AUTHENTICATION_FAILED')
        }
    }
    export class AccountNotValidated extends DomainError{
        constructor() {
            super('ACCOUNT_NOT_VALIDATED')
        }
    }

    export class InvalidRecoveryCode extends DomainError{
        constructor() {
            super('INVALID_RECOVERY_CODE')
        }
    }

}