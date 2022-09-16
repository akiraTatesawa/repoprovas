import {
  createTestService,
  getTestsDisciplinesService,
} from "../../services/testServices";
import { CreateTestController } from "./createTestController";
import { GetTestsByDisciplinesController } from "./getTestsByDisciplinesController";

export const createTestController = new CreateTestController(createTestService);

export const getTestsByDisciplinesController =
  new GetTestsByDisciplinesController(getTestsDisciplinesService);
