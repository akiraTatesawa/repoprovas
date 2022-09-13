import bcrypt from "bcrypt";

export interface CryptUtilsInterface {
  hashDataBcrypt(data: string): string;
  validateEncryptedData(data: string, hashData: string): boolean;
}

export class CryptUtils implements CryptUtilsInterface {
  hashDataBcrypt(data: string): string {
    return bcrypt.hashSync(data, 10);
  }

  validateEncryptedData(data: string, hashData: string): boolean {
    return bcrypt.compareSync(data, hashData);
  }
}
