import { Request, Response } from "express";
import { Controller } from "../../@types/controllerType";
import { TestData } from "../../repositories/testRepository";
import { ICreateTestService } from "../../services/testServices/createTestService";

export class CreateTestController extends Controller<ICreateTestService> {
  async handle(req: Request, res: Response): Promise<void> {
    const data: TestData = req.body;

    await this.service.execute(data);

    res.sendStatus(201);
  }
}
