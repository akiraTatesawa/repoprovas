import joi from "joi";

export const userSignUpSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
});

export const userSignInSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
  password: joi.string().required(),
});
