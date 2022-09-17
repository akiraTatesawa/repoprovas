import { Request, Response } from "express";

import { Controller } from "../../@types/controllerType";
import { IGetTestsTeacherService } from "../../services/testServices/getTestsByTeacherService";

export class GetTestsByTeacherController extends Controller<IGetTestsTeacherService> {
  async handle(_req: Request, res: Response): Promise<void> {
    const tests = await this.service.execute();

    res.send(tests);
  }
}
