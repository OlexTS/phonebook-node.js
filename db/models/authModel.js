const { Schema, model } = require('mongoose');
const Joi = require('joi');

const authSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']   
    },
    password: {
        type: String,
        required: [true, 'Please set a password for user']
    }, 
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
},
    {versionKey: false}
);

const User = model('User', authSchema);

module.exports = {User};