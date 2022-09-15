import { randEmail, randPassword } from "@ngneat/falso";
import { IRegisterUserRequest } from "../../src/services/authServices/signUpService";

interface IUserFactory {
  createUser(): IRegisterUserRequest;
}

export class UserFactory implements IUserFactory {
  createUser(): IRegisterUserRequest {
    const email = randEmail();
    const password = randPassword();
    return {
      email,
      password,
      confirmPassword: password,
    };
  }
}
