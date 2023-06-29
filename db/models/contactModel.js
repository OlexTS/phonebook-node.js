const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  number: Joi.string()
    .pattern(/^(\+38)\s?\(?\d{3}\)?\s?\d{3}-?\d{4}$/)
    .required(),
});

const changeSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  number: Joi.string().pattern(/^(\+38)\s?\(?\d{3}\)?\s?\d{3}-?\d{4}$/),
});

const schemas = { addSchema, changeSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
