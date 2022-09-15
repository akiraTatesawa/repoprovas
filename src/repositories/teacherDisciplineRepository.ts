import { Discipline, Teacher, TeacherDiscipline } from "@prisma/client";
import { IRepoGetById } from "../@types/repositoryTypes";
import { prisma } from "../config/prisma";

interface ITeacherGetById {
  getTeacherById(id: number): Promise<Teacher | null>;
}

interface IDisciplineGetById {
  getDisciplineById(id: number): Promise<Discipline | null>;
}

export interface ITeacherDisciplineRepository
  extends IRepoGetById<TeacherDiscipline>,
    IDisciplineGetById,
    ITeacherGetById {}

export class TeacherDisciplineRepository
  implements ITeacherDisciplineRepository
{
  async getById(id: number): Promise<TeacherDiscipline | null> {
    return prisma.teacherDiscipline.findUnique({
      where: {
        id,
      },
    });
  }

  async getDisciplineById(id: number): Promise<Discipline | null> {
    return prisma.discipline.findUnique({
      where: {
        id,
      },
    });
  }

  async getTeacherById(id: number): Promise<Teacher | null> {
    return prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }
}
