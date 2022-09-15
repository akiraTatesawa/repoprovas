import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidationMiddleware";
import { validateBody } from "../middlewares/schemaMiddleware";
import { createTestController } from "../controllers/testControllers/index";

export const testRouter = Router();

testRouter.post("/", validateToken, validateBody("test"), (req, res) =>
  createTestController.implement(req, res)
);
