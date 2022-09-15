// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { server } from "../src/app";
import { prisma } from "../src/config/prisma";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$disconnect();
});

describe("POST /sign-up", () => {
  it("Should create an user and return status 201", async () => {
    const reqBody = {
      email: "user@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const result = await supertest(server).post("/sign-up").send(reqBody);

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({});
  });

  it("Should return status 409 if the user is already registered", async () => {
    const reqBody = {
      email: "user@gmail.com",
      password: "password",
      confirmPassword: "password",
    };

    const result = await supertest(server).post("/sign-up").send(reqBody);

    expect(result.status).toEqual(409);
    expect(result.body).toEqual({
      message: "This email is already being used",
      name: "Conflict",
    });
  });

  it("Should return status 422 when body is invalid or passwords don't match", async () => {
    const invalidReqBody = {
      email: "test@gmail.com",
      password: "password",
      confirmPassword: "invalid-password",
    };

    const result = await supertest(server)
      .post("/sign-up")
      .send(invalidReqBody);

    expect(result.status).toEqual(422);
  });
});
