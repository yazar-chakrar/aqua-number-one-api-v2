/*jshint esversion: 8*/
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxLength: 50,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    category: {
        type: String,
        required: true,
        enum: ['Gold', 'Silver', 'Bronze', 'Iron'],
        default: "Iron"
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign(_.pick(this, ['_id', 'isAdmin']), config.get('jwtPrivateKey'));
};

const User = mongoose.model('Users', userSchema);

function validate(user){
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.number().required(),
        email: Joi.string(),
        category: Joi.string(),
        isAdmin: Joi.boolean(),
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validate;