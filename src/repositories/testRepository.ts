/* eslint-disable no-confusing-arrow */
import { TeacherDiscipline, Test, Category, Term } from "@prisma/client";
import { IRepoCreate } from "../@types/repositoryTypes";
import { prisma } from "../config/prisma";

export type TestData = Omit<Test, "id" | "createdAt">;

type CategoryType = Omit<Category, "createdAt">;

type TermType = Omit<Term, "createdAt">;

interface IDiscipline {
  id: number;
  name: string;
  termId: number;
  categories: {
    id: number;
    name: string;
    tests: Test[];
  }[];
}

interface ITest extends Test {
  teacherDiscipline: TeacherDiscipline & {
    teacher: {
      name: string;
    };
    discipline: {
      id: number;
    };
  };
}

export interface ITestsByDiscipline {
  disciplines: IDiscipline[] | [];
  number: number;
  id: number;
}

export interface ITestByTeacher {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
    tests: {
      id: number;
      name: string;
      pdfUrl: string;
      teacherDiscipline: {
        discipline: {
          id: number;
          name: string;
        };
      };
    }[];
  }[];
}

export interface ITestRepository extends IRepoCreate<TestData> {
  getAllTestsPerDiscipline(): Promise<ITestsByDiscipline[]>;
  getTestsByTeacher(): Promise<ITestByTeacher[]>;
}

export class TestRepository implements ITestRepository {
  async create(data: TestData): Promise<void> {
    await prisma.test.create({
      data,
    });
  }

  async getAllTestsPerDiscipline(): Promise<ITestsByDiscipline[]> {
    const terms: TermType[] = await prisma.term.findMany({
      select: {
        id: true,
        number: true,
      },
    });

    const disciplines: IDiscipline[] = await prisma.discipline.findMany({
      select: {
        id: true,
        name: true,
        termId: true,
        categories: {
          select: {
            id: true,
            name: true,
            tests: {
              where: {
                id: 0,
              },
            },
          },
        },
      },
    });

    const categories: CategoryType[] = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const tests: ITest[] = await prisma.test.findMany({
      include: {
        teacherDiscipline: {
          include: {
            teacher: {
              select: {
                name: true,
              },
            },
            discipline: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const categoryTable: { [key: number]: boolean } = {};
    for (let k = 0; k < categories.length; k++) {
      categoryTable[categories[k].id] = true;
    }

    const disciplinesCategoriesTable: {
      [key: number]: { [key: number]: boolean };
    } = {};
    for (let i = 0; i < disciplines.length; i++) {
      disciplinesCategoriesTable[disciplines[i].id] = categoryTable;
    }

    for (let j = 0; j < tests.length; j++) {
      const testCategoryId = tests[j].categoryId;
      const testDisciplineId = tests[j].teacherDiscipline.disciplineId;

      if (disciplinesCategoriesTable[testDisciplineId][testCategoryId]) {
        disciplines[testDisciplineId - 1].categories[testCategoryId - 1].tests =
          [
            ...disciplines[testDisciplineId - 1].categories[testCategoryId - 1]
              .tests,
            tests[j],
          ];
      }
    }

    const termsTable: { [key: number]: IDiscipline[] | [] } = {};
    for (let p = 0; p < terms.length; p++) {
      termsTable[terms[p].id] = [];
    }

    for (let m = 0; m < disciplines.length; m++) {
      const { termId } = disciplines[m];
      termsTable[termId] = [...termsTable[termId], disciplines[m]];
    }

    const testsPerTermsAndDisciplines = [];
    for (let n = 0; n < terms.length; n++) {
      testsPerTermsAndDisciplines.push({
        ...terms[n],
        disciplines: termsTable[n + 1] || [],
      });
    }

    return testsPerTermsAndDisciplines;
  }

  async getTestsByTeacher(): Promise<ITestByTeacher[]> {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const categoriesPromise = [];
    for (let i = 0; i < teachers.length; i++) {
      categoriesPromise.push(
        prisma.category.findMany({
          select: {
            id: true,
            name: true,
            tests: {
              where: {
                teacherDiscipline: {
                  teacherId: teachers[i].id,
                },
              },
              select: {
                id: true,
                name: true,
                pdfUrl: true,
                teacherDiscipline: {
                  select: {
                    discipline: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
      );
    }
    const categories = await Promise.all(categoriesPromise);

    const teacherTests = [];
    for (let j = 0; j < teachers.length; j++) {
      teacherTests.push({
        id: teachers[j].id,
        name: teachers[j].name,
        categories: categories[j],
      });
    }

    return teacherTests;
  }
}
