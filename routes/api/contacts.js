const express = require('express')

const router = express.Router()
const {getAllContactsCtrl, addContactCtrl, updateContactCtrl, deleteContactCtrl} = require('../../controllers/contacts/contactsControllers')
router.get('/', getAllContactsCtrl)

router.post('/', addContactCtrl)

router.delete('/:contactId', deleteContactCtrl )

router.put('/:contactId', updateContactCtrl)

module.exports = router
