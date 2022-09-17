import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidationMiddleware";
import { validateBody } from "../middlewares/schemaMiddleware";
import {
  createTestController,
  getTestsByDisciplinesController,
  getTestsByTeacherController,
} from "../controllers/testControllers/index";

export const testRouter = Router();

testRouter.post("/", validateToken, validateBody("test"), (req, res) =>
  createTestController.handle(req, res)
);

testRouter.get("/disciplines", validateToken, (req, res) =>
  getTestsByDisciplinesController.handle(req, res)
);

testRouter.get("/teachers", validateToken, async (req, res) =>
  getTestsByTeacherController.handle(req, res)
);
