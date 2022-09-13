import "./config/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { serverRouter } from "./routes";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

const server = express();

server.use(cors());
server.use(express.json());

server.use(serverRouter);
server.use(errorHandlingMiddleware);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
