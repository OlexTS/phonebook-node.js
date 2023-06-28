const { HttpError, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../db/models/contactModel");

const getAllContactsCtrl = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};
const addContactCtrl = async (req, res, next) => {
  const result = await Contact.create({ ...req.body });
  res.status(201).json(result);
};
const updateContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing fields");
  }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const deleteContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "The contact was successfully deleted" });
};

module.exports = {
  getAllContactsCtrl: ctrlWrapper(getAllContactsCtrl),
  addContactCtrl: ctrlWrapper(addContactCtrl),
  updateContactCtrl: ctrlWrapper(updateContactCtrl),
  deleteContactCtrl: ctrlWrapper(deleteContactCtrl),
};
