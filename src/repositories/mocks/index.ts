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
