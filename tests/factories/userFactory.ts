import { randEmail, randPassword } from "@ngneat/falso";
import { IRegisterUserRequest } from "../../src/services/authServices/signUpService";
import { Utils } from "../../src/utils";

interface IUserRegisterFactory {
  createUserRequest(): IRegisterUserRequest;
  createUserRequestUnmatchedPassword(): IRegisterUserRequest;
}

interface IUserLoginFactory {
  createUser(): { email: string; password: string; hashedPassword: string };
}

export class UserFactory implements IUserRegisterFactory, IUserLoginFactory {
  private email: string;

  private password: string;

  private hashedPassword: string;

  constructor() {
    this.email = randEmail();
    this.password = randPassword();

    this.hashedPassword = Utils.CryptUtils.hashDataBcrypt(this.password);
  }

  createUserRequest(): IRegisterUserRequest {
    return {
      email: this.email,
      password: this.password,
      confirmPassword: this.password,
    };
  }

  createUserRequestUnmatchedPassword(): IRegisterUserRequest {
    return {
      email: this.email,
      password: this.password,
      confirmPassword: "different-password",
    };
  }

  createUser(): { email: string; password: string; hashedPassword: string } {
    return {
      email: this.email,
      password: this.password,
      hashedPassword: this.hashedPassword,
    };
  }
}
