import joi from "joi";

export const userValidator = joi
  .object({
    username: joi.string().required(),
    password: joi.string().required().min(8).max(24),
  })
  .with("username", "password");

export const noteValidator = joi
  .object({
    title: joi.string().required(),
    content: joi.string().required(),
  })
  .with("title", "content");
