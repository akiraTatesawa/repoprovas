import { randEmail, randPassword } from "@ngneat/falso";
import { IRegisterUserRequest } from "../../src/services/authServices/signUpService";
import { Utils } from "../../src/utils";

type Header = {
  Authorization: string;
};

interface IUserRegisterFactory {
  createUserRequest(): IRegisterUserRequest;
  createUserRequestUnmatchedPassword(): IRegisterUserRequest;
}

interface IUserLoginFactory {
  createInvalidToken(): Header;
  createInvalidFormatToken(): Header;
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

  createInvalidToken(): Header {
    return {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR4cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2MzI2ODk4NX0.iPzYbbgffs6_Oh_NKHO61ep2kRIPD_THefbwPa1aw7c`,
    };
  }

  createInvalidFormatToken(): Header {
    return {
      Authorization: "invalid format without Bearer",
    };
  }
}
