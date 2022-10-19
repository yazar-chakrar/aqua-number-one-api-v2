/*jshint esversion: 8*/
const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const route = express.Router();

route.get('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({phone: req.body.phone});
    if (!user) return res.status(404).send('Invalid phone or password');

    password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(404).send('Invalid phone or password');

    const token = user.generateAuthToken();
    res.send(token);

});

function validate(req){
    const schema= Joi.object({
        phone: Joi.number().required(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
};

module.exports = route;