import { NextFunction, Request, Response } from "express";
import {
  userSignInSchema as signIn,
  userSignUpSchema as signUp,
} from "../schemas/authSchemas";
import { testSchema as test } from "../schemas/testSchemas";

import { CustomError } from "../entities/CustomError";

const Schemas = {
  signIn,
  signUp,
  test,
};

type Validator = keyof typeof Schemas;

export function validateBody(
  validator: Validator
): (req: Request, _res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { error } = Schemas[validator].validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join("; ");
      throw new CustomError("error_unprocessable_entity", message);
    }

    return next();
  };
}
