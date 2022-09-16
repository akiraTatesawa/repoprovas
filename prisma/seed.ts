import { PrismaClient } from "@prisma/client";

interface ISeed {
  main(): Promise<void>;
}
class Seed implements ISeed {
  private prisma: PrismaClient = new PrismaClient();

  async main(): Promise<void> {
    try {
      console.log("\nRestarting all tables...");
      await this.prisma
        .$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE disciplines RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE teachers RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE terms RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE disciplines_teachers RESTART IDENTITY CASCADE;`;
      await this.prisma
        .$queryRaw`TRUNCATE TABLE tests RESTART IDENTITY CASCADE;`;
      console.log("OK!");

      console.log("\nInserting terms...");
      await this.prisma.term.createMany({
        data: [
          { number: 1 },
          { number: 2 },
          { number: 3 },
          { number: 4 },
          { number: 5 },
          { number: 6 },
        ],
      });
      console.log("OK!");

      console.log("\nInserting categories...");
      await this.prisma.category.createMany({
        data: [
          { name: "Projeto" },
          { name: "Prática" },
          { name: "Recuperação" },
        ],
      });
      console.log("OK!");

      console.log("\nInserting teachers...");
      await this.prisma.teacher.createMany({
        data: [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }],
      });
      console.log("OK!");

      console.log("\nInserting disciplines...");
      await this.prisma.discipline.create({
        data: {
          name: "HTML e CSS",
          termId: 1,
          categories: {
            connect: [
              { name: "Projeto" },
              { name: "Prática" },
              { name: "Recuperação" },
            ],
          },
        },
      });
      await this.prisma.discipline.create({
        data: {
          name: "JavaScript",
          termId: 2,
          categories: {
            connect: [
              { name: "Projeto" },
              { name: "Prática" },
              { name: "Recuperação" },
            ],
          },
        },
      });
      await this.prisma.discipline.create({
        data: {
          name: "React",
          termId: 3,
          categories: {
            connect: [
              { name: "Projeto" },
              { name: "Prática" },
              { name: "Recuperação" },
            ],
          },
        },
      });
      await this.prisma.discipline.create({
        data: {
          name: "Humildade",
          termId: 1,
          categories: {
            connect: [
              { name: "Projeto" },
              { name: "Prática" },
              { name: "Recuperação" },
            ],
          },
        },
      });
      await this.prisma.discipline.create({
        data: {
          name: "Planejamento",
          termId: 2,
          categories: {
            connect: [
              { name: "Projeto" },
              { name: "Prática" },
              { name: "Recuperação" },
            ],
          },
        },
      });
      await this.prisma.discipline.create({
        data: {
          name: "Autoconfiança",
          termId: 3,
          categories: {
            connect: [
              { name: "Projeto" },
              { name: "Prática" },
              { name: "Recuperação" },
            ],
          },
        },
      });
      console.log("OK!");

      console.log("\nInserting teacher/discipline relations...");
      await this.prisma.teacherDiscipline.createMany({
        data: [
          { teacherId: 1, disciplineId: 1 },
          { teacherId: 1, disciplineId: 2 },
          { teacherId: 1, disciplineId: 3 },
          { teacherId: 2, disciplineId: 4 },
          { teacherId: 2, disciplineId: 5 },
          { teacherId: 2, disciplineId: 6 },
        ],
      });
      console.log("OK!");
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

new Seed().main();
