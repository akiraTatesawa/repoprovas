import { Category } from "@prisma/client";
import { IRepoGetById } from "../@types/repositoryTypes";
import { prisma } from "../config/prisma";

export interface ICategoryRepository extends IRepoGetById<Category> {}

export class CategoryRepository implements ICategoryRepository {
  async getById(id: number): Promise<Category | null> {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }
}
