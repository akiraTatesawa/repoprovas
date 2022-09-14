import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";

import * as Controllers from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post("/sign-up", validateBody("signUp"), Controllers.signUp);

authRouter.post("/sign-in", validateBody("signIn"));
