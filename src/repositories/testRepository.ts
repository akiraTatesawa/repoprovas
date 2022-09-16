/* eslint-disable no-confusing-arrow */
import { Test } from "@prisma/client";
import { IRepoCreate } from "../@types/repositoryTypes";
import { prisma } from "../config/prisma";

export type TestData = Omit<Test, "id" | "createdAt">;

export interface ITestsByDiscipline {
  disciplines: {
    categories: {
      tests: {
        id: number;
        name: string;
        pdfUrl: string;
        teacherDiscipline: {
          disciplineId: number;
          teacher: {
            name: string;
          };
        };
      }[];
      name: string;
    }[];
    id: number;
    name: string;
  }[];
  number: number;
}

export interface ITestRepository extends IRepoCreate<TestData> {
  getAllTestsPerDiscipline(): Promise<ITestsByDiscipline[]>;
}

export class TestRepository implements ITestRepository {
  async create(data: TestData): Promise<void> {
    await prisma.test.create({
      data,
    });
  }

  async getAllTestsPerDiscipline(): Promise<ITestsByDiscipline[]> {
    const termsDisciplinesCategoriesTests = await prisma.term.findMany({
      orderBy: { number: "asc" },
      select: {
        number: true,
        disciplines: {
          select: {
            id: true,
            name: true,
            categories: {
              select: {
                name: true,
                tests: {
                  select: {
                    id: true,
                    name: true,
                    pdfUrl: true,
                    teacherDiscipline: {
                      select: {
                        disciplineId: true,
                        teacher: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const tests: ITestsByDiscipline[] = termsDisciplinesCategoriesTests.map(
      (term) => ({
        ...term,
        disciplines: term.disciplines.map((discipline) => ({
          ...discipline,
          categories: discipline.categories
            .map((category) => ({
              ...category,
              tests: category.tests.filter(
                (test) => test.teacherDiscipline.disciplineId === discipline.id
              ),
            }))
            .filter((category) => category.tests[0]),
        })),
      })
    );

    return tests;
  }

  async getTestsByTeacher() {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const categoriesPromise = [];
    for (let k = 0; k < teachers.length; k++) {
      categoriesPromise.push(
        prisma.category.findMany({
          select: {
            id: true,
            name: true,
            tests: {
              where: {
                teacherDiscipline: {
                  teacherId: teachers[k].id,
                },
              },
              include: {
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
