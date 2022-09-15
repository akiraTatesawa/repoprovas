import { IServiceExecute } from "../../@types/serviceTypes";
import { ICategoryRepository } from "../../repositories/categoryRepository";

export class ValidateCategoryService
  implements IServiceExecute<number, boolean>
{
  constructor(private categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id: number): Promise<boolean> {
    const category = await this.categoryRepository.getById(id);

    if (!category) {
      return false;
    }

    return true;
  }
}
