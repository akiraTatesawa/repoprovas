import { mockSignInService } from "../../services/authServices/mocks";
import { SignInController } from "./signInController";

function mockResponse() {
  const res = {
    send: () => {},
    status: () => {},
  };
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

function mockRequest() {
  return {
    body: {},
  };
}
describe("Sign In Controller", () => {
  it("Should be able to login and return 200 with a token", async () => {
    const res = mockResponse();
    const req = mockRequest();
    const service = mockSignInService();
    const controller = new SignInController(service);

    jest
      .spyOn(service, "execute")
      .mockImplementationOnce(() => ({ token: "" }));

    // @ts-ignore type safety error in tests
    await expect(controller.handle(req, res)).resolves.not.toThrow();
    expect(service.execute).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ token: "" });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
