import { IServiceExecute } from "../../@types/serviceTypes";
import {
  ITestsByDiscipline,
  ITestRepository,
} from "../../repositories/testRepository";

export interface IGetTestsDisciplinesService
  extends IServiceExecute<void, ITestsByDiscipline[]> {}

export class GetTestsDisciplinesService implements IGetTestsDisciplinesService {
  constructor(private repository: ITestRepository) {
    this.repository = repository;
  }

  async execute(): Promise<ITestsByDiscipline[]> {
    const tests = await this.repository.getAllTestsPerDiscipline();

    return tests;
  }
}
