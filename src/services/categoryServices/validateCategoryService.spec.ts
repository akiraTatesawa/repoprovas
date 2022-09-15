import { CategoryRepository } from "../../repositories/categoryRepository";
import { ValidateCategoryService } from "./validateCategoryService";

const repository = new CategoryRepository();
const validateCategoryService = new ValidateCategoryService(repository);

describe("Validate Category Service", () => {
  it("Should return false if category does not exists", async () => {
    jest.spyOn(repository, "getById").mockResolvedValueOnce(null);

    await expect(validateCategoryService.execute(1)).resolves.toEqual(false);

    expect(repository.getById).toHaveBeenCalled();
  });

  it("Should return true if category exists", async () => {
    jest.spyOn(repository, "getById").mockResolvedValueOnce({
      id: 1,
      name: "validName",
      createdAt: new Date(),
    });

    await expect(validateCategoryService.execute(1)).resolves.toEqual(true);

    expect(repository.getById).toHaveBeenCalled();
  });
});
