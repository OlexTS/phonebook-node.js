const Contact =require('../../db/models/contactModel')

const getAllContactsCtrl = async (req, res, next) => {
    const result = await Contact.find();
    res.json(result)
};
const addContactCtrl = async (req, res, next) => {
    const result = await Contact.create(req.body);
    console.log(result);
    res.status(201).json(result)
};
const updateContactCtrl = async () => {};
const deleteContactCtrl = async () => {};



module.exports = { getAllContactsCtrl, addContactCtrl, updateContactCtrl, deleteContactCtrl };
