const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
});

const Contact = model("Contact", contactSchema);

module.exports = Contact;
