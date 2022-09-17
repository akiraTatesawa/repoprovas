import { mockTestRepository } from "../../repositories/mocks";
import { CreateTestService } from "./createTestService";

const validateCategoryExecuteSpy = jest.fn();
const validateTeacherDisciplineSpy = jest.fn();
const repository = mockTestRepository();

const createTestService = new CreateTestService(
  { execute: validateCategoryExecuteSpy },
  { execute: validateTeacherDisciplineSpy },
  repository
);

describe("Create Test Service", () => {
  it("Should be able to create a test", async () => {
    validateCategoryExecuteSpy.mockResolvedValueOnce(true);
    validateTeacherDisciplineSpy.mockResolvedValueOnce(true);
    jest.spyOn(repository, "create").mockImplementationOnce(() => {});

    await expect(
      createTestService.execute({
        name: "test name",
        categoryId: 2,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 1,
      })
    ).resolves.not.toThrow();

    expect(validateCategoryExecuteSpy).toHaveBeenCalled();
    expect(validateTeacherDisciplineSpy).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalled();
  });

  it("Should not be able to create a test with invalid category", async () => {
    validateCategoryExecuteSpy.mockResolvedValueOnce(false);

    await expect(
      createTestService.execute({
        name: "test name",
        categoryId: 1,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 1,
      })
    ).rejects.toEqual({
      message: "Category not found",
      type: "error_not_found",
    });

    expect(validateCategoryExecuteSpy).toHaveBeenCalled();
  });

  it("Should not be able to create a test with invalid teacher/discipline relation", async () => {
    validateCategoryExecuteSpy.mockResolvedValueOnce(true);
    validateTeacherDisciplineSpy.mockResolvedValueOnce(false);

    await expect(
      createTestService.execute({
        name: "test name",
        categoryId: 1,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 1,
      })
    ).rejects.toEqual({
      message: "Teacher/Discipline relation not found",
      type: "error_not_found",
    });

    expect(validateCategoryExecuteSpy).toHaveBeenCalled();
    expect(validateTeacherDisciplineSpy).toHaveBeenCalled();
  });
});
