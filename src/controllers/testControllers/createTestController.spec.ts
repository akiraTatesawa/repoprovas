import { CreateTestController } from "./createTestController";

function mockResponse() {
  const res = {
    sendStatus: () => {},
  };
  res.sendStatus = jest.fn().mockReturnValue(res);
  return res;
}

function mockRequest() {
  return {
    body: jest.fn().mockReturnValue({
      name: "test name",
      categoryId: 1,
      pdfUrl: "http://url.com",
      teacherDisciplineId: 1,
    }),
  };
}

describe("Create Test Controller", () => {
  it("Should be able to create a test and return 201", async () => {
    const executeSpy = jest.fn();
    const res = mockResponse();
    const req = mockRequest();

    const createTestController = new CreateTestController({
      execute: executeSpy,
    });
    // @ts-ignore type safety error in tests
    await expect(createTestController.handle(req, res)).resolves.not.toThrow();

    expect(executeSpy).toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(201);
  });
});
