import { TestRepository } from "../../repositories/testRepository";
import { GetTestsTeacherService } from "../../services/testServices/getTestsByTeacherService";
import { GetTestsByTeacherController } from "./getTestsByTeacherController";

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
const service = new GetTestsTeacherService(repository);
const controller = new GetTestsByTeacherController(service);

describe("Get Tests By Teacher Controller", () => {
  it("Should be able to GET and return 200 ", async () => {
    const res = mockResponse();

    jest.spyOn(repository, "getTestsByTeacher").mockResolvedValueOnce([]);
    jest
      .spyOn(service, "execute")
      .mockResolvedValueOnce(repository.getTestsByTeacher());

    // @ts-ignore type safety error in tests
    await expect(controller.handle(null, res)).resolves.not.toThrow();
    expect(repository.getTestsByTeacher).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([]);
  });
});
