import { Router } from "express";
import { authRouter } from "./authRoute";

export const serverRouter = Router();

serverRouter.use(authRouter);
