import { Router } from "express";
import { authRouter } from "./authRoute";
import { testRouter } from "./testRoute";

export const serverRouter = Router();

serverRouter.use(authRouter);
serverRouter.use("/tests", testRouter);
