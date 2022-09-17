import { mockTestService } from "../../services/testServices/mocks";
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
describe("Get Tests By Discipline Controller", () => {
  it("Should be able to GET and return 200", async () => {
    const service = mockTestService();
    const controller = new GetTestsByDisciplinesController(service);

    const res = mockResponse();

    jest.spyOn(service, "execute").mockResolvedValueOnce([]);

    // @ts-ignore type safety error in tests
    await expect(controller.handle(null, res)).resolves.not.toThrow();
    expect(service.execute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([]);
  });
});
