import { mockTeacherDisciplineRepository } from "../../repositories/mocks";
import { ValidateTeacherDisciplineService } from "./validateId";

const repository = mockTeacherDisciplineRepository();
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
    jest.spyOn(repository, "getById").mockResolvedValueOnce({});

    await expect(validateTeacherDisciplineService.execute(1)).resolves.toEqual(
      true
    );

    expect(repository.getById).toHaveBeenCalled();
  });
});
