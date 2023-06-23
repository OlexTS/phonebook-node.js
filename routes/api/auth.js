const express = require('express');

const router = express.Router();

const { register, logIn, logOut, refresh } = require('../../controllers/contacts/authControllers');
const {schemas} = require('../../db/models/authModel');

const { validateBody } = require('../../middlewares');

router.post('/register', validateBody(schemas.userRegisterSchema), register);
router.post('/login', validateBody(schemas.userLogInSchema), logIn);
router.post('/logout', logOut);
router.get('/current', refresh);

module.exports = router;