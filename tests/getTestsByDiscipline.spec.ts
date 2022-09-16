// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { prisma } from "../src/config/prisma";
import { server } from "../src/app";
import { UserFactory } from "./factories/userFactory";

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

  it("Should return 200 with all the tests", async () => {
    const token = new UserFactory().createValidToken();

    const result = await supertest(server).get("/tests/disciplines").set(token);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Should return 400 and not be able to get tests without a token", async () => {
    const result = await supertest(server).get("/tests/disciplines");

    expect(result.status).toEqual(400);
  });

  it("Should return 401 and not be able to get tests with an invalid token", async () => {
    const invalidToken = new UserFactory().createInvalidToken();

    const result = await supertest(server)
      .get("/tests/disciplines")
      .set(invalidToken);

    expect(result.status).toEqual(401);
  });

  it("Should return 422 and not be able to get tests with an invalid token format", async () => {
    const invalidTokenFormat = new UserFactory().createInvalidFormatToken();

    const result = await supertest(server)
      .get("/tests/disciplines")
      .set(invalidTokenFormat);

    expect(result.status).toEqual(422);
  });
});
