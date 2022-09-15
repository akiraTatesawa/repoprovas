import { TestRepository } from "../../repositories/testRepository";
import { CreateTestService } from "./createTestService";
import { validateTeacherDisciplineService } from "../teacherDisciplineServices/index";
import { validateCategoryService } from "../categoryServices/index";
import { CustomError } from "../../entities/CustomError";

const repository = new TestRepository();

const createTestService = new CreateTestService(
  validateCategoryService,
  validateTeacherDisciplineService,
  repository
);

describe("Create Test Service", () => {
  it("Should be able to create a test", async () => {
    jest.spyOn(validateCategoryService, "execute").mockResolvedValueOnce(true);
    jest
      .spyOn(validateTeacherDisciplineService, "execute")
      .mockResolvedValue(true);
    jest.spyOn(repository, "create").mockResolvedValueOnce();

    await expect(
      createTestService.execute({
        name: "test name",
        categoryId: 1,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 1,
      })
    ).resolves.not.toThrow();

    expect(validateCategoryService.execute).toHaveBeenCalled();
    expect(validateTeacherDisciplineService.execute).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalled();
  });

  it("Should not be able to create a test with invalid category", async () => {
    jest.spyOn(validateCategoryService, "execute").mockResolvedValueOnce(false);

    await expect(
      createTestService.execute({
        name: "test name",
        categoryId: 1,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 1,
      })
    ).rejects.toEqual(new CustomError("error_not_found", "Category not found"));

    expect(validateCategoryService.execute).toHaveBeenCalled();
  });

  it("Should not be able to create a test with invalid teacher/discipline relation", async () => {
    jest.spyOn(validateCategoryService, "execute").mockResolvedValueOnce(true);
    jest
      .spyOn(validateTeacherDisciplineService, "execute")
      .mockResolvedValue(false);

    await expect(
      createTestService.execute({
        name: "test name",
        categoryId: 1,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 1,
      })
    ).rejects.toEqual(
      new CustomError(
        "error_not_found",
        "Teacher/Discipline relation not found"
      )
    );

    expect(validateCategoryService.execute).toHaveBeenCalled();
    expect(validateTeacherDisciplineService.execute).toHaveBeenCalled();
  });
});
