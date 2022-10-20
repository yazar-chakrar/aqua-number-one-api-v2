/*jshint esversion: 8*/
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');
const { Food } = require('./food');

const orderSchema = mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            phone: {
                type: Number,
                required: true,
            }
        })
    },
    lines: [{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            quantity: {
                type: Number,
                min: 1,
                required: true,
            }
        })
    }],
    location: {
        type: String,
        required: true
    }
    
});
const Order = mongoose.model('Orders', orderSchema);

function validate(order){
    const linsSchema = Joi.object({
        foodId: Joi.objectId().required(),
        quantity: Joi.number().required(),
    });

    const schema = Joi.object({
        userId: Joi.objectId().required(),
        lines: Joi.array().items(linsSchema),
        location: Joi.string().required(),
    });

    return schema.validate(order);
}

exports.Order = Order;
exports.validate = validate;