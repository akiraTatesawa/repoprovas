import { mockUserRepository } from "../../repositories/mocks";
import { LoginUserService } from "./signInService";
import { mockJWTUtils, mockCryptUtils } from "../../utils/mocks/index";

const repository = mockUserRepository();
const jwtUtils = mockJWTUtils();
const cryptUtils = mockCryptUtils();

const loginUserService = new LoginUserService(repository, jwtUtils, cryptUtils);

describe("Login User Service", () => {
  it("Should be able to login", async () => {
    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce({
      email: "example@gmail.com",
      password: "password",
    });
    jest
      .spyOn(cryptUtils, "validateEncryptedData")
      .mockImplementationOnce(() => true);
    jest.spyOn(jwtUtils, "createToken").mockReturnValueOnce("token");

    await expect(
      loginUserService.execute({
        email: "example@gmail.com",
        password: "password",
      })
    ).resolves.toEqual({ token: "token" });

    expect(repository.getByEmail).toHaveBeenCalled();
    expect(cryptUtils.validateEncryptedData).toHaveBeenCalled();
  });
  it("Should not be able to login if user does not exist", async () => {
    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce(null);
    await expect(
      loginUserService.execute({
        email: "example@gmail.com",
        password: "password",
      })
    ).rejects.toEqual({ message: "User not found", type: "error_not_found" });

    expect(repository.getByEmail).toHaveBeenCalled();
  });

  it("Should not be able to login if password is wrong", async () => {
    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce({
      email: "example@gmail.com",
      password: "password",
    });
    jest
      .spyOn(cryptUtils, "validateEncryptedData")
      .mockImplementationOnce(() => false);

    await expect(
      loginUserService.execute({
        email: "example@gmail.com",
        password: "password",
      })
    ).rejects.toEqual({
      message: "Wrong Password",
      type: "error_unauthorized",
    });

    expect(repository.getByEmail).toHaveBeenCalled();
    expect(cryptUtils.validateEncryptedData).toHaveBeenCalled();
  });
});
