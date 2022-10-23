/*jshint esversion: 8*/
const mongoose = require('mongoose');
const Joi = require('joi');

const foodSchema = mongoose.Schema({
    image:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    discription: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        default:0,
        minlength: 0
    },
    oldPrice: {
        type: Number,
        min: 0,
        default: function() {
            return this.price;
        }
    },
    isAvaible: {
        type: Boolean,
        default: true,
    }
});

const Food = mongoose.model('Foods', foodSchema);

function validate(food){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        //image: Joi.any().required(),
        category: Joi.string().min(5).max(50).required(),
        discription: Joi.string().min(5).max(255),
        price: Joi.number().min(0).required(),
        oldPrice: Joi.number().min(0),
        isAvaible: Joi.boolean()
    });
    return schema.validate(food);
}

exports.Food = Food;
exports.validate = validate;