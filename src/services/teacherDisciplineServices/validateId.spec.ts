import { ValidateTeacherDisciplineService } from "./validateId";

const getByIdSpy = jest.fn();
const validateTeacherDisciplineService = new ValidateTeacherDisciplineService({
  getById: getByIdSpy,
});

describe("Validate Teacher/Discipline Service", () => {
  it("Should return false if relation does not exists", async () => {
    getByIdSpy.mockResolvedValueOnce(null);

    await expect(validateTeacherDisciplineService.execute(1)).resolves.toEqual(
      false
    );

    expect(getByIdSpy).toHaveBeenCalled();
  });

  it("Should return true if relation does exists", async () => {
    getByIdSpy.mockResolvedValueOnce({
      id: 1,
      teacherId: 1,
      disciplineId: 1,
    });

    await expect(validateTeacherDisciplineService.execute(1)).resolves.toEqual(
      true
    );

    expect(getByIdSpy).toHaveBeenCalled();
  });
});
