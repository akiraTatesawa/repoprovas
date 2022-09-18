/* eslint-disable no-confusing-arrow */
import { TeacherDiscipline, Test, Category, Term } from "@prisma/client";
import { IRepoCreate } from "../@types/repositoryTypes";
import { prisma } from "../config/prisma";

export type TestData = Omit<Test, "id" | "createdAt">;

type CategoryType = Omit<Category, "createdAt">;

type TermType = Omit<Term, "createdAt">;

type CategoryTable = {
  [key: number]: {
    index: number;
  };
};

type DisciplineTable = {
  [key: number]: {
    index: number;
    categories: CategoryTable;
  };
};

type TermTable = {
  [key: number]: IDiscipline[] | [];
};

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
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        number: true,
      },
    });

    const disciplines: IDiscipline[] = await prisma.discipline.findMany({
      orderBy: {
        id: "asc",
      },
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

    // Create Categories Hash Table
    const categoryTable: CategoryTable = {};
    for (let k = 0; k < categories.length; k++) {
      categoryTable[categories[k].id] = {
        index: k,
      };
    }

    // Create Disciplines With Categories Hash Table
    const disciplinesCategoriesTable: DisciplineTable = {};
    for (let i = 0; i < disciplines.length; i++) {
      disciplinesCategoriesTable[disciplines[i].id] = {
        index: i,
        categories: categoryTable,
      };
    }

    // Add the tests to the disciplines with categories Array
    for (let j = 0; j < tests.length; j++) {
      const testCategoryId = tests[j].categoryId;
      const testDisciplineId = tests[j].teacherDiscipline.disciplineId;

      const discipline = disciplinesCategoriesTable[testDisciplineId];

      if (discipline.categories[testCategoryId]) {
        const disciplineIndex = discipline.index;
        const categoryIndex = discipline.categories[testCategoryId].index;

        disciplines[disciplineIndex].categories[categoryIndex].tests = [
          ...disciplines[disciplineIndex].categories[categoryIndex].tests,
          tests[j],
        ];
      }
    }

    // Create Terms Hash Table
    const termsTable: TermTable = {};
    for (let p = 0; p < terms.length; p++) {
      termsTable[terms[p].id] = [];
    }

    // Add the disciplines Array to the Terms Hash Table
    for (let m = 0; m < disciplines.length; m++) {
      const { termId } = disciplines[m];
      termsTable[termId] = [...termsTable[termId], disciplines[m]];
    }

    // Create the tests filtered by categories/disciplines/terms Array
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
    const categoriesWithTests = await Promise.all(categoriesPromise);

    const teacherTests = [];
    for (let j = 0; j < teachers.length; j++) {
      teacherTests.push({
        id: teachers[j].id,
        name: teachers[j].name,
        categories: categoriesWithTests[j],
      });
    }

    return teacherTests;
  }
}
