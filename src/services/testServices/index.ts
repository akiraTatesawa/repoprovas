import { TestRepository } from "../../repositories/testRepository";
import { CreateTestService } from "./createTestService";
import { validateCategoryService } from "../categoryServices/index";
import { validateTeacherDisciplineService } from "../teacherDisciplineServices/index";

const testRepository = new TestRepository();

export const createTestService = new CreateTestService(
  validateCategoryService,
  validateTeacherDisciplineService,
  testRepository
);
