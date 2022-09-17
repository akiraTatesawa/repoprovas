import { mockTestRepository } from "../../repositories/mocks";
import { GetTestsTeacherService } from "./getTestsByTeacherService";

const repository = mockTestRepository();
const service = new GetTestsTeacherService(repository);

describe("Get Tests by Teacher Service", () => {
  it("Should be able to list all the tests", async () => {
    jest.spyOn(repository, "getTestsByTeacher").mockResolvedValueOnce([]);

    await expect(service.execute()).resolves.not.toThrow();
    expect(repository.getTestsByTeacher).toHaveBeenCalled();
  });
});
