export function mockSignInService() {
  return {
    ensureUserExists: jest.fn(),
    isPasswordCorrect: jest.fn(),
    execute: jest.fn(),
  };
}

export function mockSignUpService() {
  return {
    isUnique: jest.fn(),
    isMatching: jest.fn(),
    execute: jest.fn(),
  };
}
