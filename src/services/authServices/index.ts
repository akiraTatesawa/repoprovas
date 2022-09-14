import { UserRepository } from "../../repositories/userRepository";
import { Utils } from "../../utils";
import { LoginUserService } from "./signInService";
import { RegisterUserService } from "./signUpService";

const userRepository = new UserRepository();

export const registerUserService = new RegisterUserService(
  userRepository,
  Utils.CryptUtils
);

export const loginUserService = new LoginUserService(
  userRepository,
  Utils.JwtUtils,
  Utils.CryptUtils
);
