import { prisma } from "../src/config/prisma";

describe("GET /tests/disciplines", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$disconnect();
  });

  it("Should return 200 with all the tests", async () => {});
});
