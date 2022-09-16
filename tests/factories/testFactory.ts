import { randVerb, randUrl } from "@ngneat/falso";
import { TestData } from "../../src/repositories/testRepository";

type InvalidTestData = TestData & { invalidField: string };

interface ITestFactory {
  createValidTest(): TestData;
  createInvalidTest(): InvalidTestData;
}

export class TestFactory implements ITestFactory {
  createValidTest(): TestData {
    return {
      name: randVerb(),
      pdfUrl: randUrl(),
      categoryId: 1,
      teacherDisciplineId: 1,
    };
  }

  createInvalidTest(): InvalidTestData {
    return {
      name: randVerb(),
      pdfUrl: randUrl(),
      categoryId: 1,
      teacherDisciplineId: 1,
      invalidField: randVerb(),
    };
  }
}
