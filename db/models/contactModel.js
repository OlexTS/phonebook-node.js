const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    number: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

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

const Contact = model("Contact", contactSchema);

module.exports = { Contact, schemas };
