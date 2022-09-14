import "./config/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { serverRouter } from "./routes";
import { handleError } from "./middlewares/errorHandlingMiddleware";

export const server = express();

server.use(cors());
server.use(express.json());

server.use(serverRouter);
server.use(handleError);
