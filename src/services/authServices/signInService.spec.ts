import { LoginUserService } from "./signInService";
import { CustomError } from "../../entities/CustomError";

const createUserSpy = jest.fn();
const getUserByEmailSpy = jest.fn();

const createTokenSpy = jest.fn();
const verifyTokenSpy = jest.fn();

const hashDataSpy = jest.fn();
const validateEncryptSpy = jest.fn();

const loginUserService = new LoginUserService(
  { create: createUserSpy, getByEmail: getUserByEmailSpy },
  { createToken: createTokenSpy, verifyToken: verifyTokenSpy },
  { hashDataBcrypt: hashDataSpy, validateEncryptedData: validateEncryptSpy }
);

describe("Register User", () => {
  it("Should not be able to login if user does not exist", async () => {
    await expect(
      loginUserService.execute({
        email: "example@gmail.com",
        password: "password",
      })
    ).rejects.toEqual(new CustomError("error_not_found", "User not found"));
  });
});
