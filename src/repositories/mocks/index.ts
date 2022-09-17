export function mockTestRepository() {
  const createSpy = jest.fn();
  const getAllByDisciplineSpy = jest.fn();
  const getAllByTeacherSpy = jest.fn();

  return {
    create: createSpy,
    getAllTestsPerDiscipline: getAllByDisciplineSpy,
    getTestsByTeacher: getAllByTeacherSpy,
  };
}

export function mockUserRepository() {
  const createSpy = jest.fn();
  const getByEmailSpy = jest.fn();

  return {
    create: createSpy,
    getByEmail: getByEmailSpy,
  };
}

export function mockCategoryRepository() {
  const getByIdSpy = jest.fn();

  return {
    getById: getByIdSpy,
  };
}

export function mockTeacherDisciplineRepository() {
  const getByIdSpy = jest.fn();

  return {
    getById: getByIdSpy,
  };
}
