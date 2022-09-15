import { ValidateTeacherDisciplineService } from "./validateId";
import { TeacherDisciplineRepository } from "../../repositories/teacherDisciplineRepository";

const repository = new TeacherDisciplineRepository();

const validateTeacherDisciplineService = new ValidateTeacherDisciplineService(
  repository
);

describe("Validate Teacher/Discipline Service", () => {
  it("Should return false if relation does not exists", async () => {
    jest.spyOn(repository, "getById").mockResolvedValueOnce(null);

    await expect(validateTeacherDisciplineService.execute(1)).resolves.toEqual(
      false
    );

    expect(repository.getById).toHaveBeenCalled();
  });

  it("Should return true if relation does exists", async () => {
    jest.spyOn(repository, "getById").mockResolvedValueOnce({
      id: 1,
      teacherId: 1,
      disciplineId: 1,
    });

    await expect(validateTeacherDisciplineService.execute(1)).resolves.toEqual(
      true
    );

    expect(repository.getById).toHaveBeenCalled();
  });
});
