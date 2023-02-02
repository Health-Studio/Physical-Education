import * as CREF from "@src/domain/educator/cref";
import { InternalError } from "@src/infrastructure/errors/internal.error";

export class RequestError extends InternalError {
  constructor(message: string) {
    const internalMessage = "Unexpected error when trying validate CREF";
    super(`${internalMessage}: ${message}`);
  }
}

export class ResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage = "Unexpected error returned by validate CREF";
    super(`${internalMessage}: ${message}`);
  }
}

export class Validator implements CREF.Validator {
  valid(name: string, cref: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
