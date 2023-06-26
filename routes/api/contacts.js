const express = require("express");

const {
  getAllContactsCtrl,
  addContactCtrl,
  updateContactCtrl,
  deleteContactCtrl,
} = require("../../controllers/contacts/contactsControllers");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../db/models/contactModel");

const router = express.Router();

router.get("/", getAllContactsCtrl);

router.post("/", validateBody(schemas.addSchema), addContactCtrl);

router.delete("/:contactId", isValidId, deleteContactCtrl);

router.put("/:contactId",  isValidId, validateBody(schemas.changeSchema),  updateContactCtrl);

module.exports = router;
