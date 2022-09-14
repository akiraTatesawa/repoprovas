import * as express from "express";
import {
  registerUserService,
  loginUserService,
} from "../services/authServices";
import { IRegisterUserRequest } from "../services/authServices/signUpService";
import { ILoginRequest } from "../services/authServices/signInService";

export async function signUp(
  req: express.Request<{}, {}, IRegisterUserRequest>,
  res: express.Response
) {
  await registerUserService.execute(req.body);

  res.sendStatus(201);
}

export async function signIn(
  req: express.Request<{}, {}, ILoginRequest>,
  res: express.Response
) {
  const token = await loginUserService.execute(req.body);

  res.send(token);
}
