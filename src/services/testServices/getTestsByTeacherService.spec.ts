import { TestRepository } from "../../repositories/testRepository";
import { GetTestsTeacherService } from "./getTestsByTeacherService";

const repository = new TestRepository();
const service = new GetTestsTeacherService(repository);

describe("Get Tests by Teacher Service", () => {
  it("Should be able to list all the tests", async () => {
    jest.spyOn(repository, "getTestsByTeacher").mockResolvedValueOnce([]);

    await expect(service.execute()).resolves.not.toThrow();
    expect(repository.getTestsByTeacher).toHaveBeenCalled();
  });
});
