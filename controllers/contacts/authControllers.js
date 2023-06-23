const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { nanoid } = require("nanoid");
const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../db/models/authModel");

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
const logIn = async (req, res, next) => {};
const logOut = async (req, res, next) => {};
const refresh = async (req, res, next) => {};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),
  refresh: ctrlWrapper(refresh),
};
