import { TestRepository } from "../../repositories/testRepository";
import { GetTestsDisciplinesService } from "./getTestsDisciplinesService";

const repository = new TestRepository();
const service = new GetTestsDisciplinesService(repository);
describe("Get Tests per Discipline Service", () => {
  it("Should be able to list all the tests", async () => {
    jest
      .spyOn(repository, "getAllTestsPerDiscipline")
      .mockResolvedValueOnce([]);

    await expect(service.execute()).resolves.not.toThrow();
    expect(repository.getAllTestsPerDiscipline).toHaveBeenCalled();
  });
});
