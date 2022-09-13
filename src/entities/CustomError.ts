import { ErrorType } from "../middlewares/errorHandlingMiddleware";

export interface CustomErrorInterface {
  type: ErrorType;
  message: string;
}

export class CustomError {
  type: ErrorType;

  message: string;

  constructor(type: ErrorType, message: string) {
    this.type = type;
    this.message = message;
  }
}
