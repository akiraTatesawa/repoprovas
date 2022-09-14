import { UserRepository } from "../../repositories/userRepository";
import { Utils } from "../../utils";
import { RegisterUserService } from "./signUpService";

const userRepository = new UserRepository();

export const registerUserService = new RegisterUserService(
  userRepository,
  Utils.CryptUtils
);
