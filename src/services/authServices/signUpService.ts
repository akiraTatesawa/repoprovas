import { IServiceExecute } from "../../@types/serviceTypes";
import { CustomError } from "../../entities/CustomError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/userRepository";
import { CryptUtilsInterface } from "../../utils/cryptUtils";

export interface IRegisterUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

type UniqueUser = Pick<IRegisterUserRequest, "email">;

type MatchingPasswords = Omit<IRegisterUserRequest, "email">;

interface IServiceValidUnique<T> {
  isUnique(data: T): Promise<boolean>;
}

interface IServiceValidPasswords<T> {
  isMatching(data: T): boolean;
}

export interface IRegisterUserService
  extends IServiceExecute<IRegisterUserRequest, void>,
    IServiceValidUnique<UniqueUser>,
    IServiceValidPasswords<MatchingPasswords> {}

export class RegisterUserService implements IRegisterUserService {
  constructor(
    private repository: IUserRepository,
    private cryptUtils: CryptUtilsInterface
  ) {
    this.repository = repository;
    this.cryptUtils = cryptUtils;
  }

  async isUnique({ email }: UniqueUser): Promise<boolean> {
    const user = await this.repository.getByEmail(email);
    if (user) {
      return false;
    }
    return true;
  }

  isMatching({ password, confirmPassword }: MatchingPasswords): boolean {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }

  async execute({
    password,
    confirmPassword,
    email,
  }: IRegisterUserRequest): Promise<void> {
    const isEmailUnique = await this.isUnique({ email });

    if (!isEmailUnique) {
      throw new CustomError(
        "error_conflict",
        "This email is already being used"
      );
    }

    const isPasswordsMatching = this.isMatching({ password, confirmPassword });

    if (!isPasswordsMatching) {
      throw new CustomError(
        "error_unprocessable_entity",
        "Passwords don't match"
      );
    }

    const user = new User(email, password, this.cryptUtils);

    await this.repository.create(user);
  }
}
