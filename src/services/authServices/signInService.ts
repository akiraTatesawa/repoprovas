import { User } from "@prisma/client";
import { IServiceExecute } from "../../@types/serviceTypes";
import { IUserRepository } from "../../repositories/userRepository";
import { JWTUtilsInterface } from "../../utils/JWTUtils";
import { CryptUtilsInterface } from "../../utils/cryptUtils";
import { CustomError } from "../../entities/CustomError";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

interface IServiceValidateUser {
  ensureUserExists(email: string): Promise<User | null>;
}

interface IServiceValidatePassword {
  isPasswordCorrect(reqPassword: string, userPassword: string): boolean;
}

export interface ILoginUserService
  extends IServiceExecute<ILoginRequest, ILoginResponse>,
    IServiceValidateUser,
    IServiceValidatePassword {}

export class LoginUserService implements ILoginUserService {
  constructor(
    private repository: IUserRepository,
    private jwtUtils: JWTUtilsInterface,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.repository = repository;
    this.cryptUtils = cryptUtils;
    this.jwtUtils = jwtUtils;
  }

  async ensureUserExists(email: string): Promise<User | null> {
    const user = await this.repository.getByEmail(email);

    if (!user) {
      return null;
    }
    return user;
  }

  isPasswordCorrect(reqPassword: string, userPassword: string): boolean {
    const isCorrect = this.cryptUtils.validateEncryptedData(
      reqPassword,
      userPassword
    );

    if (!isCorrect) {
      return false;
    }
    return true;
  }

  async execute({ email, password }: ILoginRequest): Promise<ILoginResponse> {
    const user = await this.ensureUserExists(email);

    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }

    const isPasswordCorrect = this.isPasswordCorrect(password, user.password);

    if (!isPasswordCorrect) {
      throw new CustomError("error_unauthorized", "Wrong Password");
    }

    const token = this.jwtUtils.createToken({ userId: user.id });

    return { token };
  }
}
