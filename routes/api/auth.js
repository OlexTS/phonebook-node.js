const express = require('express');

const router = express.Router();

const { register, logIn, logOut, refresh } = require('../../controllers/contacts/authControllers');

const { validateBody } = require('../../middlewares');

router.post('/register', validateBody(), register);
router.post('/login', validateBody(), logIn);
router.post('/logout', validateBody(), logOut);
router.get('/refresh', refresh);

module.exports = router;