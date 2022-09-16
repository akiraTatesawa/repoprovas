// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { server } from "../src/app";
import { prisma } from "../src/config/prisma";
import { UserFactory } from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
  await prisma.$disconnect();
});

describe("POST /tests", () => {
  it("Should be able to create a test", async () => {
    const { email, password, hashedPassword } = new UserFactory().createUser();
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const resultSignIn = await supertest(server)
      .post("/sign-in")
      .send({ email, password });

    const token = {
      Authorization: `Bearer ${resultSignIn.body.token}`,
    };

    const resultTest = await supertest(server).post("/tests").set(token).send({
      name: "test name",
      categoryId: 1,
      pdfUrl: "http://url.com",
      teacherDisciplineId: 14,
    });

    expect(resultTest.status).toEqual(201);
    expect(resultTest.body).toEqual({});
  });

  it("Should not be able to create a test with an invalid test format", async () => {
    const { email, password, hashedPassword } = new UserFactory().createUser();
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const resultSignIn = await supertest(server)
      .post("/sign-in")
      .send({ email, password });

    const token = {
      Authorization: `Bearer ${resultSignIn.body.token}`,
    };

    const resultTest = await supertest(server).post("/tests").set(token).send({
      name: "test name",
      categoryId: 1,
      pdfUrl: "http://url.com",
      teacherDisciplineId: 14,
      invalidField: "",
    });

    expect(resultTest.status).toEqual(422);
    expect(resultTest.body).toBeInstanceOf(Object);
  });

  it("Should not be able to create a test without a token", async () => {
    const resultTest = await supertest(server).post("/tests").send({
      name: "test name",
      categoryId: 1,
      pdfUrl: "http://url.com",
      teacherDisciplineId: 14,
    });

    expect(resultTest.status).toEqual(400);
    expect(resultTest.body).toBeInstanceOf(Object);
  });

  it("Should not be able to create a test with an invalid token format", async () => {
    const invalidTokenFormat = {
      Authorization: "invalid",
    };

    const resultTest = await supertest(server)
      .post("/tests")
      .set(invalidTokenFormat)
      .send({
        name: "test name",
        categoryId: 1,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 14,
      });

    expect(resultTest.status).toEqual(422);
    expect(resultTest.body).toBeInstanceOf(Object);
  });

  it("Should not be able to create a test with an invalid token", async () => {
    const resultTest = await supertest(server)
      .post("/tests")
      .set({
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR4cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2MzI2ODk4NX0.iPzYbbgffs6_Oh_NKHO61ep2kRIPD_THefbwPa1aw7c`,
      })
      .send({
        name: "test name",
        categoryId: 1,
        pdfUrl: "http://url.com",
        teacherDisciplineId: 14,
      });

    expect(resultTest.status).toEqual(401);
    expect(resultTest.body).toBeInstanceOf(Object);
  });
});
