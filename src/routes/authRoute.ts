import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import {
  signInController,
  signUpController,
} from "../controllers/authControllers/index";

export const authRouter = Router();

authRouter.post("/sign-up", validateBody("signUp"), (req, res) =>
  signUpController.handle(req, res)
);

authRouter.post("/sign-in", validateBody("signIn"), (req, res) =>
  signInController.handle(req, res)
);
