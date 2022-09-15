import { CategoryRepository } from "../../repositories/categoryRepository";
import { ValidateCategoryService } from "./validateCategoryService";

const categoryRepository = new CategoryRepository();

export const validateCategoryService = new ValidateCategoryService(
  categoryRepository
);
