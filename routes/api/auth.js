const express = require('express');

const router = express.Router();

const { register, logIn, logOut, getCurrent } = require('../../controllers/contacts/authControllers');
const {schemas} = require('../../db/models/authModel');

const { validateBody, authenticate } = require('../../middlewares');

router.post('/register', validateBody(schemas.userRegisterSchema), register);
router.post('/login', validateBody(schemas.userLogInSchema), logIn);
router.post('/logout', authenticate, logOut);
router.get('/current', authenticate, getCurrent);

module.exports = router;