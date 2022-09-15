import joi from "joi";

export const testSchema = joi.object({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().integer().required(),
  teacherDisciplineId: joi.number().integer().required(),
});
