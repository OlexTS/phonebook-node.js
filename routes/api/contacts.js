const express = require("express");

const {
  getAllContactsCtrl,
  addContactCtrl,
  updateContactCtrl,
  deleteContactCtrl,
} = require("../../controllers/contacts/contactsControllers");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../db/models/contactModel");

const router = express.Router();

router.get("/", getAllContactsCtrl);

router.post("/", validateBody(schemas.addSchema), addContactCtrl);

router.delete("/:contactId", deleteContactCtrl);

router.put("/:contactId", validateBody(schemas.changeSchema), updateContactCtrl);

module.exports = router;
