import {
  createTestService,
  getTestsDisciplinesService,
  getTestsByTeacherService,
} from "../../services/testServices";
import { CreateTestController } from "./createTestController";
import { GetTestsByDisciplinesController } from "./getTestsByDisciplinesController";
import { GetTestsByTeacherController } from "./getTestsByTeacherController";

export const createTestController = new CreateTestController(createTestService);

export const getTestsByDisciplinesController =
  new GetTestsByDisciplinesController(getTestsDisciplinesService);

export const getTestsByTeacherController = new GetTestsByTeacherController(
  getTestsByTeacherService
);
