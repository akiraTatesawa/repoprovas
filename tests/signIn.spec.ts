// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { server } from "../src/app";
import { prisma } from "../src/config/prisma";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /sign-in", () => {
  it("Should be able to log in", async () => {
    const registerBody = {
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    };

    await supertest(server).post("/sign-up").send(registerBody);

    const reqBody = {
      email: "test@gmail.com",
      password: "password123",
    };

    const result = await supertest(server).post("/sign-in").send(reqBody);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("token");
  });

  it("Should return status 422 when body is invalid", async () => {
    const reqBody = {
      email: "test@gmail.com",
      password: "",
    };

    const result = await supertest(server).post("/sign-in").send(reqBody);

    expect(result.status).toEqual(422);
  });

  it("Should return status 401 when password is incorrect", async () => {
    const reqBody = {
      email: "test@gmail.com",
      password: "incorrect-password",
    };

    const result = await supertest(server).post("/sign-in").send(reqBody);

    expect(result.status).toEqual(401);
  });

  it("Should return status 404 when user does not exist", async () => {
    const reqBody = {
      email: "user@gmail.com",
      password: "password",
    };

    const result = await supertest(server).post("/sign-in").send(reqBody);

    expect(result.status).toEqual(404);
  });
});
