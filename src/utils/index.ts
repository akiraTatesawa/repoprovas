import { CryptUtils as _CryptUtils } from "./cryptUtils";
import { JWTUtils as _JWTUtils } from "./JWTUtils";

export namespace Utils {
  export const CryptUtils = new _CryptUtils();
  export const JwtUtils = new _JWTUtils(process.env.JWT_SECRET);
}
