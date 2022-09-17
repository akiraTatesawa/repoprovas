import { ValidateCategoryService } from "./validateCategoryService";
import { mockCategoryRepository } from "../../repositories/mocks/index";

const repository = mockCategoryRepository();
const validateCategoryService = new ValidateCategoryService(repository);

describe("Validate Category Service", () => {
  it("Should return false if category does not exists", async () => {
    jest.spyOn(repository, "getById").mockResolvedValueOnce(null);

    await expect(validateCategoryService.execute(1)).resolves.toEqual(false);

    expect(repository.getById).toHaveBeenCalled();
  });

  it("Should return true if category exists", async () => {
    jest.spyOn(repository, "getById").mockResolvedValueOnce({});

    await expect(validateCategoryService.execute(1)).resolves.toEqual(true);

    expect(repository.getById).toHaveBeenCalled();
  });
});
