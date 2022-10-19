/*jshint esversion: 8*/
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const route = express.Router();
const auth = require('../middleware/auth');

route.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

route.get('/', async(req, res) => {
    users = await User.find().sort('name').select('-password');
    res.send(users);
});

route.post('/', async (req, res) =>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({phone: req.body.phone});
    console.log(user);
    if (user) return res.status(400).send('Phone is already used..');

    user = new User(_.pick(req.body, ['name', 'email', 'phone', 'password', 'isAdmin' , 'category']));

    const salt = await bcrypt.genSalt(5);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'phone']));
});


module.exports = route;