const express = require("express");

const {
  getAllContactsCtrl,
  addContactCtrl,
  updateContactCtrl,
  deleteContactCtrl,
} = require("../../controllers/contacts/contactsControllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../db/models/contactModel");

const router = express.Router();

router.get("/", authenticate, getAllContactsCtrl);

router.post("/", authenticate, validateBody(schemas.addSchema), addContactCtrl);

router.delete("/:contactId", authenticate, isValidId, deleteContactCtrl);

router.put("/:contactId", authenticate,  isValidId, validateBody(schemas.changeSchema),  updateContactCtrl);

module.exports = router;
