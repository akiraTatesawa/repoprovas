import * as express from "express";
import { registerUserService } from "../services/authServices";
import { IRegisterUserRequest } from "../services/authServices/signUpService";

export async function signUp(
  req: express.Request<{}, {}, IRegisterUserRequest>,
  res: express.Response
) {
  await registerUserService.execute(req.body);

  res.sendStatus(201);
}
