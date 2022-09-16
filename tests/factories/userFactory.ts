import { randEmail, randPassword } from "@ngneat/falso";
import { IRegisterUserRequest } from "../../src/services/authServices/signUpService";
import { Utils } from "../../src/utils";
import { prisma } from "../../src/config/prisma";

type Header = {
  Authorization: string;
};

interface IUserRegisterFactory {
  createUserRequest(): IRegisterUserRequest;
  createUserRequestUnmatchedPassword(): IRegisterUserRequest;
  createUser(): Promise<IRegisterUserRequest>;
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

  createValidToken(): Header {
    const token = Utils.JwtUtils.createToken({ userId: 4 });

    return {
      Authorization: `Bearer ${token}`,
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

  async createUser(): Promise<IRegisterUserRequest> {
    const user = { email: this.email, password: this.hashedPassword };

    await prisma.user.create({
      data: user,
    });

    return this.createUserRequest();
  }
}
