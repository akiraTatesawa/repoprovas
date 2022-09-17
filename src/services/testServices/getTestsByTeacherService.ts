import { IServiceExecute } from "../../@types/serviceTypes";
import {
  ITestByTeacher,
  ITestRepository,
} from "../../repositories/testRepository";

export interface IGetTestsTeacherService
  extends IServiceExecute<void, ITestByTeacher[]> {}

export class GetTestsTeacherService implements IGetTestsTeacherService {
  constructor(private repository: ITestRepository) {
    this.repository = repository;
  }

  async execute(): Promise<ITestByTeacher[]> {
    const tests = await this.repository.getTestsByTeacher();

    return tests;
  }
}
