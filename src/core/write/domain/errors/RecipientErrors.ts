import {DomainError} from "ddd";

export namespace RecipientErrors{

  export class RecipientNotFound extends DomainError{
    constructor() {
      super('RECIPIENT_NOT_FOUND');
    }
  }
}
