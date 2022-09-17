import { mockSignUpService } from "../../services/authServices/mocks";
import { SignUpController } from "./signUpController";

function mockResponse() {
  const res = {
    sendStatus: () => {},
  };
  res.sendStatus = jest.fn().mockReturnValue(res);
  return res;
}

function mockRequest() {
  return {
    body: {},
  };
}

describe("Sign Up Controller", () => {
  it("Should be able to create and user and return 201", async () => {
    const res = mockResponse();
    const req = mockRequest();
    const service = mockSignUpService();
    const controller = new SignUpController(service);

    jest.spyOn(service, "execute").mockImplementationOnce(() => {});
    // @ts-ignore type safety error in tests
    await expect(controller.handle(req, res)).resolves.not.toThrow();
    expect(service.execute).toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(201);
  });
});
