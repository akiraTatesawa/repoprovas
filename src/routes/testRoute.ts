import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidationMiddleware";
import { validateBody } from "../middlewares/schemaMiddleware";
import { createTestController } from "../controllers/testControllers/index";
import { main } from "../repositories/testRepository";

export const testRouter = Router();

testRouter.post("/", validateToken, validateBody("test"), (req, res) =>
  createTestController.handle(req, res)
);

testRouter.get("/", async (req, res) => {
  const get = await main();
  res.json(get);
});
