
import { HttpStatus } from "../type/statusCodeC";  

export class AppError extends Error {
  public statusCode: number;
  public success: boolean;
  public errorType: string;
  public result: Record<string, string>;

  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    errorType: string = 'internal server error',
    result: Record<string, string> = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errorType = errorType;
    this.result = result;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      errorType: this.errorType,
      result: this.result,
    };
  }
}
