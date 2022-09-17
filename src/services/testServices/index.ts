import { TestRepository } from "../../repositories/testRepository";
import { CreateTestService } from "./createTestService";
import { validateCategoryService } from "../categoryServices/index";
import { validateTeacherDisciplineService } from "../teacherDisciplineServices/index";
import { GetTestsDisciplinesService } from "./getTestsDisciplinesService";
import { GetTestsTeacherService } from "./getTestsByTeacherService";

const testRepository = new TestRepository();

export const createTestService = new CreateTestService(
  validateCategoryService,
  validateTeacherDisciplineService,
  testRepository
);

export const getTestsDisciplinesService = new GetTestsDisciplinesService(
  testRepository
);

export const getTestsByTeacherService = new GetTestsTeacherService(
  testRepository
);
