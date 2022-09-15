import { ValidateTeacherDisciplineService } from "./validateId";
import { TeacherDisciplineRepository } from "../../repositories/teacherDisciplineRepository";

export const validateTeacherDisciplineService =
  new ValidateTeacherDisciplineService(new TeacherDisciplineRepository());
