import { User } from "@prisma/client";
import { IRepoCreate } from "../@types/repositoryTypes";
import { prisma } from "../config/prisma";

export type UserData = Omit<User, "id" | "createdAt">;

export interface IUserRepository extends IRepoCreate<UserData> {
  getByEmail(email: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  async create(data: UserData): Promise<void> {
    await prisma.user.create({ data });
  }

  async getByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
