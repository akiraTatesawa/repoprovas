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

describe("POST /sign-in", () => {
  it("Should be able to log in", async () => {
    const { email, password, hashedPassword } = new UserFactory().createUser();

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email, password });

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("token");
  });

  it("Should return status 422 when body is invalid", async () => {
    const { email } = new UserFactory().createUser();

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email, password: "" });

    expect(result.status).toEqual(422);
  });

  it("Should return status 401 when password is incorrect", async () => {
    const { email, hashedPassword } = new UserFactory().createUser();

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email, password: "incorrect-password" });

    expect(result.status).toEqual(401);
  });

  it("Should return status 404 when user does not exist", async () => {
    const { email, password } = new UserFactory().createUser();

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email, password });

    expect(result.status).toEqual(404);
  });
});
