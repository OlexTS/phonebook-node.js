const express = require('express')

const router = express.Router()
const {getAllContactsCtrl, addContactCtrl, updateContactCtrl, deleteContactCtrl} = require('../../controllers/contacts/contactsControllers')
router.get('/', getAllContactsCtrl)

router.post('/', addContactCtrl)

router.delete('/:contactId', updateContactCtrl)

router.put('/:contactId', deleteContactCtrl)

module.exports = router
