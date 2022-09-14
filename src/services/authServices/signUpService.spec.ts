import { RegisterUserService } from "./signUpService";
import { CustomError } from "../../entities/CustomError";

const createUserSpy = jest.fn();
const getUserByEmailSpy = jest.fn();

const hashDataSpy = jest.fn();
const validateEncryptSpy = jest.fn();

const registerUserService = new RegisterUserService(
  { create: createUserSpy, getByEmail: getUserByEmailSpy },
  { hashDataBcrypt: hashDataSpy, validateEncryptedData: validateEncryptSpy }
);

describe("Register User", () => {
  it("Should be able to create an user", async () => {
    await expect(
      registerUserService.execute({
        email: "example@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
    ).resolves.not.toThrow();

    expect(createUserSpy).toHaveBeenCalled();
    expect(getUserByEmailSpy).toHaveBeenCalled();
  });

  it("Should not be able to create an user with unmatched password", async () => {
    await expect(
      registerUserService.execute({
        email: "example@gmail.com",
        password: "password",
        confirmPassword: "different-password",
      })
    ).rejects.toEqual(
      new CustomError("error_unprocessable_entity", "Passwords don't match")
    );
  });
});
