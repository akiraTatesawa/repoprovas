import { TestRepository } from "../../repositories/testRepository";
import { GetTestsDisciplinesService } from "../../services/testServices/getTestsDisciplinesService";
import { GetTestsByDisciplinesController } from "./getTestsByDisciplinesController";

function mockResponse() {
  const res = {
    send: () => {},
    status: () => {},
  };
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

const repository = new TestRepository();
const service = new GetTestsDisciplinesService(repository);
const controller = new GetTestsByDisciplinesController(service);

describe("Get Tests By Discipline Controller", () => {
  it("Should be able to GET and return 200", async () => {
    const res = mockResponse();

    jest
      .spyOn(repository, "getAllTestsPerDiscipline")
      .mockResolvedValueOnce([]);
    jest
      .spyOn(service, "execute")
      .mockResolvedValueOnce(repository.getAllTestsPerDiscipline());

    // @ts-ignore type safety error in tests
    await expect(controller.handle(null, res)).resolves.not.toThrow();
    expect(service.execute).toHaveBeenCalled();
    expect(repository.getAllTestsPerDiscipline).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([]);
  });
});
