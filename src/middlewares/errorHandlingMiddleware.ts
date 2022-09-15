/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const Errors = {
  error_bad_request: {
    status: 400,
    name: "Bad Request",
  },
  error_unauthorized: {
    status: 401,
    name: "Unauthorized",
  },
  error_forbidden: {
    status: 403,
    name: "Forbidden",
  },
  error_not_found: {
    status: 404,
    name: "Not Found",
  },
  error_conflict: {
    status: 409,
    name: "Conflict",
  },
  error_unprocessable_entity: {
    status: 422,
    name: "Unprocessable Entity",
  },
  error_internal_server_error: {
    status: 500,
    name: "Internal Server Error",
  },
};

export type ErrorType = keyof typeof Errors;

interface ErrorHandlerObject extends ErrorRequestHandler, Error {
  type: ErrorType;
  message: string;
}

export async function handleError(
  error: ErrorHandlerObject,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { message, type } = error;

  if (Errors[type]) {
    const { status, name } = Errors[type];
    return res.status(status).json({ name, message });
  }

  console.log(error);
  return res.sendStatus(500);
}
