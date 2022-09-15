import { TestData } from "../repositories/testRepository";

export class Test implements TestData {
  readonly name: string;

  readonly pdfUrl: string;

  readonly categoryId: number;

  readonly teacherDisciplineId: number;

  constructor({ name, categoryId, pdfUrl, teacherDisciplineId }: TestData) {
    this.name = name;
    this.categoryId = categoryId;
    this.pdfUrl = pdfUrl;
    this.teacherDisciplineId = teacherDisciplineId;
  }
}
