import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidationMiddleware";
import { validateBody } from "../middlewares/schemaMiddleware";
import {
  createTestController,
  getTestsByDisciplinesController,
} from "../controllers/testControllers/index";
import { TestRepository } from "../repositories/testRepository";

export const testRouter = Router();

testRouter.post("/", validateToken, validateBody("test"), (req, res) =>
  createTestController.handle(req, res)
);

testRouter.get("/disciplines", validateToken, (req, res) =>
  getTestsByDisciplinesController.handle(req, res)
);

testRouter.get("/teachers", async (req, res) =>
  res.send(await new TestRepository().getTestsByTeacher())
);
