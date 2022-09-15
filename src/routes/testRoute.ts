import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidationMiddleware";
import { validateBody } from "../middlewares/schemaMiddleware";

import * as Controllers from "../controllers/testControllers";

export const testRouter = Router();

testRouter.post(
  "/",
  validateToken,
  validateBody("test"),
  Controllers.createTest
);
