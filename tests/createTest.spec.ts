// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { server } from "../src/app";
import { prisma } from "../src/config/prisma";
import { TestFactory } from "./factories/testFactory";
import { UserFactory } from "./factories/userFactory";

describe("POST /tests", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$disconnect();
  });
  it("Should be able to create a test", async () => {
    const token = new UserFactory().createValidToken();
    const validTest = new TestFactory().createValidTest();

    const resultTest = await supertest(server)
      .post("/tests")
      .set(token)
      .send(validTest);

    expect(resultTest.status).toEqual(201);
    expect(resultTest.body).toEqual({});
  });

  it("Should not be able to create a test with an invalid test format", async () => {
    const token = new UserFactory().createValidToken();

    const invalidTest = new TestFactory().createInvalidTest();
    const resultTest = await supertest(server)
      .post("/tests")
      .set(token)
      .send(invalidTest);

    expect(resultTest.status).toEqual(422);
    expect(resultTest.body).toBeInstanceOf(Object);
  });

  it("Should not be able to create a test without a token", async () => {
    const validTest = new TestFactory().createValidTest();
    const resultTest = await supertest(server).post("/tests").send(validTest);

    expect(resultTest.status).toEqual(400);
    expect(resultTest.body).toBeInstanceOf(Object);
  });

  it("Should not be able to create a test with an invalid token format", async () => {
    const validTest = new TestFactory().createValidTest();
    const invalidTokenFormat = new UserFactory().createInvalidFormatToken();
    const resultTest = await supertest(server)
      .post("/tests")
      .set(invalidTokenFormat)
      .send(validTest);

    expect(resultTest.status).toEqual(422);
    expect(resultTest.body).toBeInstanceOf(Object);
  });

  it("Should not be able to create a test with an invalid token", async () => {
    const validTest = new TestFactory().createValidTest();
    const invalidToken = new UserFactory().createInvalidToken();
    const resultTest = await supertest(server)
      .post("/tests")
      .set(invalidToken)
      .send(validTest);

    expect(resultTest.status).toEqual(401);
    expect(resultTest.body).toBeInstanceOf(Object);
  });
});
