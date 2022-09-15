import { Request, Response } from "express";
import { Controller } from "../../@types/controllerType";
import {
  IRegisterUserService,
  IRegisterUserRequest,
} from "../../services/authServices/signUpService";

export class SignUpController extends Controller<IRegisterUserService> {
  async handle(req: Request, res: Response): Promise<void> {
    const data: IRegisterUserRequest = req.body;

    await this.service.execute(data);

    res.sendStatus(201);
  }
}
