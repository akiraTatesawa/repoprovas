export function mockJWTUtils() {
  const createTokenSpy = jest.fn();
  const validateTokenSpy = jest.fn();

  return {
    createToken: createTokenSpy,
    verifyToken: validateTokenSpy,
  };
}

export function mockCryptUtils() {
  const hashDataSpy = jest.fn();
  const validateEncryptSpy = jest.fn();

  return {
    hashDataBcrypt: hashDataSpy,
    validateEncryptedData: validateEncryptSpy,
  };
}
