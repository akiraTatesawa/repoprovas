// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { server } from "../src/app";
import { prisma } from "../src/config/prisma";
import { UserFactory } from "./factories/userFactory";

describe("POST /sign-in", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$disconnect();
  });
  it("Should be able to log in", async () => {
    // Fix
    const user = await new UserFactory().createUser();

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email: user.email, password: user.password });

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("token");
  });

  it("Should return status 422 when body is invalid", async () => {
    const user = await new UserFactory().createUser();

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email: user.email, password: user.password, invalidField: "" });

    expect(result.status).toEqual(422);
  });

  it("Should return status 401 when password is incorrect", async () => {
    // Fix
    const user = await new UserFactory().createUser();

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email: user.email, password: "incorrect-password" });

    expect(result.status).toEqual(401);
  });

  it("Should return status 404 when user does not exist", async () => {
    const user = new UserFactory().createUserRequest();

    const result = await supertest(server)
      .post("/sign-in")
      .send({ email: user.email, password: user.password });

    expect(result.status).toEqual(404);
  });
});
