import { createTestService } from "../../services/testServices";
import { CreateTestController } from "./createTestController";

export const createTestController = new CreateTestController(createTestService);
