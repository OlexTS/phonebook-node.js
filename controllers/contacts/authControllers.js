const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// const { nanoid } = require("nanoid");
const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../db/models/authModel");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
  }
  const createHashPassword = await bcrypt.hash(password, 10);
  //   const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};
const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = { id: user._id }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, {token})
  res.json({
    token: token, user: {
      name: user.name,
      email: user.email,
    }
  });
};
const logOut = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({message: 'Logout success'})
};
const getCurrent = async (req, res, next) => {
  const { email, name } = req.user;
  res.json({email, name})
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),
  getCurrent: ctrlWrapper(getCurrent)
}