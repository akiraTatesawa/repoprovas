import { RegisterUserService } from "./signUpService";
import { mockUserRepository } from "../../repositories/mocks";
import { mockCryptUtils } from "../../utils/mocks/index";

const repository = mockUserRepository();
const cryptUtils = mockCryptUtils();

const registerUserService = new RegisterUserService(repository, cryptUtils);

describe("Register User Service", () => {
  it("Should be able to create an user", async () => {
    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce(null);
    jest
      .spyOn(registerUserService, "isMatching")
      .mockImplementationOnce(() => true);

    await expect(
      registerUserService.execute({
        email: "example@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
    ).resolves.not.toThrow();

    expect(repository.getByEmail).toHaveBeenCalled();
    expect(registerUserService.isMatching).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalled();
  });

  it("Should not be able to create an user with unmatched password", async () => {
    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce(null);
    jest
      .spyOn(registerUserService, "isMatching")
      .mockImplementationOnce(() => false);

    await expect(
      registerUserService.execute({
        email: "example@gmail.com",
        password: "password",
        confirmPassword: "different-password",
      })
    ).rejects.toEqual({
      message: "Passwords don't match",
      type: "error_unprocessable_entity",
    });

    expect(repository.getByEmail).toHaveBeenCalled();
    expect(registerUserService.isMatching).toHaveBeenCalled();
  });

  it("Should not be able to create an user that already is registered", async () => {
    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce({});

    await expect(
      registerUserService.execute({
        email: "example@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
    ).rejects.toEqual({
      message: "This email is already being used",
      type: "error_conflict",
    });

    expect(repository.getByEmail).toHaveBeenCalled();
  });
});
