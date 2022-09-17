import { Request, Response } from "express";
import { Controller } from "../../@types/controllerType";
import {
  ILoginUserService,
  ILoginRequest,
} from "../../services/authServices/signInService";

export class SignInController extends Controller<ILoginUserService> {
  async handle(req: Request, res: Response): Promise<void> {
    const data: ILoginRequest = req.body;

    const token = await this.service.execute(data);

    res.status(200).send(token);
  }
}
