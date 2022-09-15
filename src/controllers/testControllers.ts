import { Request, Response } from "express";
import { TestData } from "../repositories/testRepository";
import { createTestService } from "../services/testServices/index";

export async function createTest(
  req: Request<{}, {}, TestData>,
  res: Response
) {
  await createTestService.execute(req.body);

  res.sendStatus(201);
}
