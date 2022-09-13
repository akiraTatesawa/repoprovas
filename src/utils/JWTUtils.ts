import jwt, { JwtPayload } from "jsonwebtoken";

export interface JWTUtilsInterface {
  createToken: (userObject: { userId: number }) => string;
  verifyToken(token: string): Promise<string | JwtPayload>;
}

export class JWTUtils implements JWTUtilsInterface {
  #JWTsecret: string;

  constructor(JWTsecret: string) {
    this.#JWTsecret = JWTsecret;
  }

  createToken(userObject: { userId: number }): string {
    const token = jwt.sign(userObject, this.#JWTsecret);
    return token;
  }

  async verifyToken(token: string): Promise<string | JwtPayload> {
    return jwt.verify(token, this.#JWTsecret);
  }
}
