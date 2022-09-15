import { IServiceExecute } from "../../@types/serviceTypes";
import { ITestRepository, TestData } from "../../repositories/testRepository";
import { CustomError } from "../../entities/CustomError";
import { IValidateTeacherDisciplineService } from "../teacherDisciplineServices/validateId";

export interface ICreateTestService extends IServiceExecute<TestData, void> {}

export class CreateTestService implements ICreateTestService {
  constructor(
    private validateCategoryService: IServiceExecute<number, boolean>,
    private validateTeacherDiscipline: IValidateTeacherDisciplineService,
    private repository: ITestRepository
  ) {
    this.validateCategoryService = validateCategoryService;
    this.validateTeacherDiscipline = validateTeacherDiscipline;
    this.repository = repository;
  }

  async execute(data: TestData): Promise<void> {
    const isCategoryValid = await this.validateCategoryService.execute(
      data.categoryId
    );
    if (!isCategoryValid) {
      throw new CustomError("error_not_found", "Category not found");
    }

    const isTeacherDisciplineValid =
      await this.validateTeacherDiscipline.execute(data.teacherDisciplineId);

    if (!isTeacherDisciplineValid) {
      throw new CustomError(
        "error_not_found",
        "Teacher/Discipline relation not found"
      );
    }

    await this.repository.create(data);
  }
}
