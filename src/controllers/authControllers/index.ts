import {
  loginUserService,
  registerUserService,
} from "../../services/authServices";
import { SignInController } from "./signInController";
import { SignUpController } from "./signUpController";

export const signUpController = new SignUpController(registerUserService);
export const signInController = new SignInController(loginUserService);
