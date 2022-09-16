import { Request, Response } from "express";

import { Controller } from "../../@types/controllerType";
import { IGetTestsDisciplinesService } from "../../services/testServices/getTestsDisciplinesService";

export class GetTestsByDisciplinesController extends Controller<IGetTestsDisciplinesService> {
  async handle(_req: Request, res: Response): Promise<void> {
    const tests = await this.service.execute();

    res.send(tests);
  }
}
