import { IServiceExecute } from "../../@types/serviceTypes";
import { ITeacherDisciplineRepository } from "../../repositories/teacherDisciplineRepository";

export interface IValidateTeacherDisciplineService
  extends IServiceExecute<number, boolean> {}

export class ValidateTeacherDisciplineService
  implements IValidateTeacherDisciplineService
{
  constructor(private repository: ITeacherDisciplineRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<boolean> {
    const teacherDiscipline = await this.repository.getById(id);

    if (!teacherDiscipline) {
      return false;
    }

    return true;
  }
}
