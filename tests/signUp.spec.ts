// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { server } from "../src/app";
import { prisma } from "../src/config/prisma";
import { UserFactory } from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$disconnect();
});

describe("POST /sign-up", () => {
  it("Should create an user and return status 201", async () => {
    const user = new UserFactory().createUserRequest();

    const result = await supertest(server).post("/sign-up").send(user);

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({});
  });

  it("Should return status 409 if the user is already registered", async () => {
    const user = new UserFactory().createUserRequest();
    await supertest(server).post("/sign-up").send(user);

    const result = await supertest(server).post("/sign-up").send(user);

    expect(result.status).toEqual(409);
    expect(result.body).toEqual({
      message: "This email is already being used",
      name: "Conflict",
    });
  });

  it("Should return status 422 when body is invalid or passwords don't match", async () => {
    const invalidUser = new UserFactory().createUserRequestUnmatchedPassword();

    const result = await supertest(server).post("/sign-up").send(invalidUser);

    expect(result.status).toEqual(422);
    expect(result.body).toBeInstanceOf(Object);
  });
});
