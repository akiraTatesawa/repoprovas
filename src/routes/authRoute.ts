import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";

export const authRouter = Router();

authRouter.post("/sign-up", validateBody("signUp"));

authRouter.post("/sign-in", validateBody("signIn"));
