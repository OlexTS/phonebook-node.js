const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../../helpers");

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Please set a password for user"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

authSchema.post("save", handleMongooseError);

const userRegisterSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    )
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
    .required(),
  confirm: Joi.any().valid(Joi.ref("password")).required(),
});

const userLogInSchema = Joi.object({
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    )
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
    .required(),
});

const userVerifySchema = Joi.object({
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    )
    .required(),
});

const schemas = { userRegisterSchema, userLogInSchema, userVerifySchema };

const User = model("user", authSchema);

module.exports = { User, schemas };
