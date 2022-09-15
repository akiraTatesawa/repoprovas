import { TeacherDiscipline } from "@prisma/client";
import { IRepoGetById } from "../@types/repositoryTypes";
import { prisma } from "../config/prisma";

export interface ITeacherDisciplineRepository
  extends IRepoGetById<TeacherDiscipline> {}

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
}
