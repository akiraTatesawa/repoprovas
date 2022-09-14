import { NextFunction, Request, Response } from "express";
import { CustomError } from "../entities/CustomError";
import { Utils } from "../utils";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new CustomError("error_bad_request", "Token must be sent");
  }
  if (!authorization.startsWith("Bearer ")) {
    throw new CustomError("error_unprocessable_entity", "Invalid token format");
  }

  try {
    const { userId } = (await Utils.JwtUtils.verifyToken(
      authorization.replace("Bearer ", "")
    )) as {
      userId: number;
    };

    res.locals.userId = userId;

    return next();
  } catch (error: any) {
    return next(
      new CustomError(
        "error_unauthorized",
        `Error decoding token: ${error.message}`
      )
    );
  }
}
