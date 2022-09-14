import { CryptUtilsInterface } from "../utils/cryptUtils";

export interface IUser {
  email: string;
  password: string;
}

export class User implements IUser {
  readonly email: string;

  readonly password: string;

  #cryptUtils: CryptUtilsInterface;

  constructor(
    email: string,
    password: string,
    cryptUtils: CryptUtilsInterface
  ) {
    this.#cryptUtils = cryptUtils;
    this.email = email;
    this.password = this.#cryptUtils.hashDataBcrypt(password);
  }
}
